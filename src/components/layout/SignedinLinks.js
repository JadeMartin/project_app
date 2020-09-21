import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';

const SignedInLinks = (props) => {
    return(
        <ul className="right">
            <li><NavLink to="/create">New Project</NavLink></li>
            <li><NavLink to={"/user/projects/" + props.userId}>My Projects</NavLink></li>
            <li><NavLink to="/" onClick={props.signOut}>Log out</NavLink></li>
            <li><NavLink to={"/user/update/" + props.userId} className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)