import React, { Component } from 'react';
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import { deleteProject }  from '../../store/actions/projectActions';



class Dashboard extends Component {
    render() {
        const { projects, auth, notifications } = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects} deleteProject={this.props.deleteProject} auth={auth}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (projectId) => dispatch(deleteProject(projectId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['createdAt', 'desc']},
        {collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
)(Dashboard)