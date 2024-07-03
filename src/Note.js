import { ToDoFeature } from "./ToDo";

function Note() {
    let title, description;

    title = ToDoFeature();
    description = ToDoFeature();

    return {title, description};
}

export {Note};