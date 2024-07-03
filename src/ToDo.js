import {format} from "date-fns";

function ToDoFeature(input="") {
    let property = input;

    function getProperty() {
        return property;
    }
    function setProperty(input='') {
        property = input;
    }

    return {getProperty, setProperty}
}


function ToDo() {
    let title, description, priority, dueDate;

    title = ToDoFeature();
    description = ToDoFeature();
    priority = ToDoFeature();
    dueDate = ToDoFeature();

    return {title, description, priority, dueDate};
}

export {ToDoFeature, ToDo};