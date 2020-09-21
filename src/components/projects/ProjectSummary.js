import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

import { AiFillEdit } from 'react-icons/ai';


const ProjectSummary = ({project, auth, deleteProject}) => {

    function handleClick() {
        deleteProject(project.id);
    }
    const editProject = (auth.uid === project.authorId) ? (
        <p>
            <Link to={'/update/projects/' + project.id} > 
                <AiFillEdit className="material-icons blue-text"/>
            </Link>
            <Link to={'/'} >  
                <i onClick={handleClick} className="material-icons blue-text">delete</i>
            </Link>
        </p>
    ) : null;

    return (
        <div className="card z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">
                    <div className="right">{editProject}</div>
                    <Link to={'/project/' + project.id}  key={project.id}>
                        <span className="card-title"> {project.title} </span>
                        <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
                        <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
                    </Link>
                </div>
            </div>
    )
}

export default ProjectSummary
