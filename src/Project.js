import {ToDo} from "./ToDo";
import { Note } from "./Note";

function Project() {
    let project = [];

    function addObject(object) {
        project.push(object);
        
    }

    function removeObject(object) {
        for (let i = 0;i < project.length;i++) {
            if (project[i] == object) {
                project = project.slice(0, i).concat(project.slice(i+1, project.length));
                break;
            }
        }
    }

    function getProject() {
        return project.slice();
    }

    return {addObject, removeObject, getProject};
}

export default Project;