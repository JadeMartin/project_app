import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import { deleteProject }  from '../../store/actions/projectActions';



class UserProjects extends Component {
    render() {
        const { projects, auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects} deleteProject={this.props.deleteProject} auth={auth}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (projectId) => dispatch(deleteProject(projectId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {return ([{collection: 'projects', where:[['authorId', '==', props.match.params.userId]]}])}))
    (UserProjects)