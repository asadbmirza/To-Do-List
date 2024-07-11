import { Project } from "./Project";

const Main = (function Main() {
    let projects = [Project("Default")];

    function addProject(project) {
        projects.push(project);
    }

    function removeProject(index) {
        projects = projects.slice(0, index).concat(projects.slice(index+1, projects.length));
        
    }

    function getProject(index) {
        return projects[index];
    }

    function getProjects() {
        return projects.slice();
    }

    return {addProject, removeProject, getProject, getProjects};
})();

export {Main};