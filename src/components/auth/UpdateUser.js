import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {updateUser} from '../../store/actions/authActions';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';

class UpdateUser extends Component {
    state = {
        firstName: '',
        lastName: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {user} = this.props;
        this.props.updateUser(this.props.match.params.userId,
            {
            firstName: this.state.firstName ? this.state.firstName : user.firstName,
            lastName: this.state.lastName ? this.state.lastName : user.lastName,
        })
        this.props.history.push('/');
    }

    render() {
        const {auth, authError, user} = this.props;
        if(!auth.uid) return <Redirect to='/'/>
        if(auth.uid !== this.props.match.params.userId) return <Redirect to='/'/>
        return (
            <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Update user info</h5>

                <div className="input-field">
                    <label className="active"  htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" onChange={this.handleChange} defaultValue={user.firstName} />
                </div>

                <div className="input-field">
                    <label className="active"  htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" onChange={this.handleChange} defaultValue={user.lastName} />
                </div>
                
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Update user</button>
                    <div className="red-text center">
                        {authError ? <p>{authError}</p> : null}
                    </div>
                </div>
            </form>
                
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.userId;
    const users = state.firestore.data.users
    const user = users ? users[id] : null;
    return {
        user: {...user},
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (id, user) => dispatch(updateUser(id, user))
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: 'users'}]))(UpdateUser)
