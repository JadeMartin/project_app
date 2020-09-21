import React from 'react';
import { Link } from 'react-router-dom';
import SignedinLinks from './SignedinLinks';
import SignedOutLinks from './SignedOutLinks';
import {connect} from 'react-redux';

const Navbar = (props) => {
    const {auth, profile} = props;
    const links = auth.uid ? <SignedinLinks profile={profile} userId={auth.uid}/> : <SignedOutLinks/>;
    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">Project Plan</Link>
                {links}
            </div>
            
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }   
}

export default connect(mapStateToProps)(Navbar)