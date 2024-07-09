import {ToDo} from "./ToDo";
import { Note } from "./Note";

function Project(input) {
    let project = [];
    let name = input;

    function addObject(object) {
        project.push(object);
        project = sortProject(project);
    }

    function removeObject(object) {
        for (let i = 0;i < project.length;i++) {
            if (project[i] == object) {
                project = project.slice(0, i).concat(project.slice(i+1, project.length));
                break;
            }
        }
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

    //Wanted to practice quick sort, lets see if it works
    function sortProject(array) {
        if (array.length <= 1) {
          return array;
        }
        
        let pivot;
        let num = 0;
        for (let i = 0;i < array.length; i++) {
            if (array[i].getType() == "ToDo") {
                pivot = array[i]
                num = i;
            }
        }
        
        
        let left = []; 
        let right = [];
      
        for (let i = 0; i < array.length; i++) {
            if (i != num) {
                if (array[i].getType() == "ToDo") {
                    array[i] < pivot ? right.push(array[i]) : left.push(array[i]);
                }
                else {
                    right.push(array[i]);
                }                
            }
            
        }
      
        return sortProject(left).concat(pivot, sortProject(right));
    };

    

    return {addObject, removeObject, getProject, changeName, getName};
}

export {Project};