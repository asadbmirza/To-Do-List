import {ToDo} from "./ToDo";
import { Note } from "./Note";

function Project(input) {
    let project = [];
    let name = input;

    function addObject(object) {
        if (object.getType() != "ToDo" || project.length == 0) {
            project.push(object);
        }
        else {
            for (let i = 0; i < project.length; i++) {
                console.log(object.priority.getProperty());
                if (project[i].getType() != "ToDo" || object.priority.getProperty() >= project[i].priority.getProperty()) {
                    project.splice(i, 0, object);
                    break;
                }
                else if (project.length - 1 == i) {
                    project.push(object);
                }
            }
            
        }
        
      
    }

    function removeObject(index) {
        project = project.slice(0, index).concat(project.slice(index+1, project.length));
    }

    function getName() {
        return name;
    }

    function changeName(input) {
        if (typeof input != typeof "string") {
            return false;
        }
        name = input;
        return true;
    }

    function getProject() {
        return project.slice();
    }


    

    return {addObject, removeObject, getProject, changeName, getName};
}

export {Project};