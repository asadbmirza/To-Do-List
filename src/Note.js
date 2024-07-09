import { ToDoFeature } from "./ToDo";

function Note() {
    let title, description;

    title = ToDoFeature();
    description = ToDoFeature();
    function getType() {
        return "Note";
    }
    return {title, description, getType};
}

export {Note};