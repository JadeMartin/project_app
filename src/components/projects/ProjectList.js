import React from 'react';
import ProjectSummary from './ProjectSummary';

const ProjectList = ({projects, auth, deleteProject}) => {
    return (
        <div className="project-list section">
            { projects && projects.map(project => {
                return (
                    <ProjectSummary project={project} auth={auth} deleteProject={deleteProject} key={project.id}/>
                )
            })}
        </div>
    )
}

export default ProjectList