import {Main} from "./ProjectFunctions";
import { Note } from "./Note";
import { ToDo } from "./ToDo";
import { Project } from "./Project";
import {format, parseISO} from "date-fns";
import addBaseDate from "./dateBase";
import "./style.css"
import EditButton from "./tag-edit-outline.svg";

function DOMHandling() {
    const content = document.querySelector("#content");
    const sidebarProjects = document.querySelector(".projects");
    const addProject = document.querySelector("#addProject");
    let newProjects = 1;
    let projectIndex = 0;
    const projectsDOM = [];
    let currentProjectValue = 0;

    //Add new ToDo to project stuff
    const newToDoDialog = document.querySelector("#newToDo");
    const newToDoSubmit = document.querySelector("#newToDoSubmit");
    
    ///Subsection deals with different note types
    const noteType = document.querySelector("#type");
    const options = document.querySelector("form>ul");
    const priority = options.childNodes[2];
    const dueDate = options.childNodes[3];
    noteType.addEventListener("click", (e) => {
        if (e.target.value == "note" && options.childElementCount == 4) {
            options.removeChild(priority);
            options.removeChild(dueDate);
        }
        else if (e.target.value == "toDo" && options.childElementCount == 2) {
            options.appendChild(priority);
            options.appendChild(dueDate);
        }
    });
    ///Subsection deals with form submission
    const inputTitle = document.querySelector("#title");
    const inputDesc = document.querySelector("#desc");
    inputDesc.value = "";
    const inputPri = document.querySelector("#pri");
    const inputDate = document.querySelector("#date");
    inputDate.min = addBaseDate;
    newToDoSubmit.addEventListener('click', addToDoToDOM);
    function addToDoToDOM(e) {
        e.preventDefault();
        if (inputTitle.value.trim() != "" && inputDesc.value.trim() != "" && (noteType.value == "note" || inputDate.value != "")) {
            newToDoDialog.close();
            let currentProject = Main.getProject(currentProjectValue);
            if (noteType.value == "note") {
                const note = Note();
                note.title.setProperty(inputTitle.value);
                note.description.setProperty(inputDesc.value);
                currentProject.addObject(note);

            }
            else {
                const toDo = ToDo();
                toDo.title.setProperty(inputTitle.value);
                toDo.description.setProperty(inputDesc.value);
                toDo.priority.setProperty(inputPri.value);
                toDo.dueDate.setProperty(format(parseISO(inputDate.value), "PPpp"));
                currentProject.addObject(toDo);
            }

            inputTitle.value = "";
            inputDesc.value = "";
            inputPri.value = "3";
            inputDate.value = "";
            renderProject();
        }
    }

    function startProject(index) {
        projectsDOM[index].classList.add("toDoContent");
        const addToDo = document.createElement("button");
        addToDo.textContent = "+";
        addToDo.addEventListener("click", () => newToDoDialog.showModal());
        projectsDOM[index].appendChild(addToDo);
    }

    //Render the contents of the projects
    function renderProject() {
        
        const priorityMapper = {"1": "Low", "2": "Medium", "3": "High"};
        projectsDOM[currentProjectValue].innerHTML = "";
        startProject(currentProjectValue);
        const toDos = Main.getProject(currentProjectValue).getProject();
        for (let i = 0; i < toDos.length;i++) {
            const toDoContainer = document.createElement("div");
            const toDoHeader = document.createElement("div");
            const toDoTitle = document.createElement("h2");
            const toDoPriority = document.createElement("h3");
            const toDoDescription = document.createElement("h3");
            const toDoDueDate = document.createElement("h3");
            const toDoRemove = document.createElement("button");
            const toDoEdit = document.createElement("button");
            const toDoEditIcon = new Image();
            let mainProject = Main.getProject(currentProjectValue);
            toDoEditIcon.src = EditButton;

            toDoRemove.textContent = "X";
            toDoRemove.classList.add("toDoRemove");
            toDoRemove.addEventListener("click", () => {
                mainProject.removeObject(i);
                renderProject();
            });

            toDoEdit.classList.add("toDoEdit");
            toDoEdit.addEventListener("click", (e) => {
                inputTitle.value = toDos[i].title.getProperty();
                inputDesc.value = toDos[i].description.getProperty();
                newToDoDialog.showModal();
                mainProject.removeObject(i);
                renderProject();
            });

            toDoTitle.textContent = toDos[i].title.getProperty();
            toDoDescription.textContent = toDos[i].description.getProperty();
            if (toDos[i].getType() == "ToDo") {
                toDoPriority.textContent = "Priority: " + priorityMapper[toDos[i].priority.getProperty()];
                toDoDueDate.textContent = toDos[i].dueDate.getProperty();
            }

            toDoDueDate.classList.add("toDoDueDate");
            
            toDoContainer.appendChild(toDoHeader);
            toDoHeader.appendChild(toDoTitle);
            toDoHeader.appendChild(toDoPriority);
            toDoHeader.appendChild(toDoRemove);
            toDoEdit.appendChild(toDoEditIcon);
            toDoContainer.appendChild(toDoDescription);
            toDoContainer.appendChild(toDoEdit);
            toDoContainer.appendChild(toDoDueDate);

            projectsDOM[currentProjectValue].appendChild(toDoContainer);
        }
    }

    //Render the contents of the Sidebar
    function renderSidebar() {
        const projects = Main.getProjects();
        for (let i = projects.length - newProjects; i < projects.length; i++) {
            const projectButton = document.createElement("button");
            projectButton.classList.add("projectButton");
            projectButton.textContent = projects[i].getName();
            projectButton.setAttribute("value", projectIndex);
            sidebarProjects.appendChild(projectButton);
            projectButton.addEventListener("click", loadProject);

            const deleteProject = document.createElement("button");
            deleteProject.addEventListener("click", () => {
                Main.removeProject(i);
                renderSidebar();
            });
            deleteProject.textContent = "X";
            projectButton.appendChild(deleteProject);
            
            projectsDOM.push(document.createElement("div"));
            startProject(projectsDOM.length-1);
            projectIndex++;
        }
        newProjects = 0;
    }
    
    function removeProject() {
        content.innerHTML = '';
    }
    function appendProject(e) {
        content.appendChild(projectsDOM[e.target.value]);
    }

    function loadProject(e) {
        removeProject();
        appendProject(e);
        currentProjectValue = e.target.value;
    }

    

    //Add new project to sidebar stuff
    const newProjectDialog = document.querySelector("#newProject");
    const newProjectSubmit = document.querySelector("#newProjectSubmit");
    addProject.addEventListener("click", (e) => newProjectDialog.showModal());
    const inputName = document.querySelector("#name");
    newProjectSubmit.addEventListener("click", addProjectToDOM);
    function addProjectToDOM(e) {
        e.preventDefault();
        Main.addProject(Project(inputName.value));
        inputName.value = "";
        newProjectDialog.close();
        newProjects++;
        renderSidebar();
    }

    
    renderSidebar();
    
}

DOMHandling();