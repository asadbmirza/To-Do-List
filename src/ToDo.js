
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
    function getType() {
        return "ToDo";
    }

    return {title, description, priority, dueDate, getType};
}

export {ToDoFeature, ToDo};