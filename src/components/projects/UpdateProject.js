import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateProject }  from '../../store/actions/projectActions';
import {Redirect} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';

class UpdateProject extends Component {
    state = {
        title: '',
        content: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {project} = this.props;
        this.props.updateProject({
            title: this.state.title ? this.state.title : project.title,
            content: this.state.content ? this.state.content : project.content,
            id: this.props.match.params.projectId
            });
        this.props.history.push('/');
    }

    render() {
        const {auth, project} = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>
        if(auth.uid !== project.authorId) return <Redirect to='/'/>
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Update Project</h5>

                    <div className="input-field">
                        <label className="active" htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} defaultValue={project.title}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="content" className="active">Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange} defaultValue={project.content}/>
                    </div>
                    
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.projectId;
    const projects = state.firestore.data.projects
    const project = projects ? projects[id] : null;
    return {
        project: {...project, id},
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProject: (project) => dispatch(updateProject(project))
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: 'projects'}]))(UpdateProject)
