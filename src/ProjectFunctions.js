import { Project } from "./Project";

const Main = (function Main() {
    let projects = [Project("Default")];

    function addProject(project) {
        projects.push(project);
    }

    function removeProject(project) {
        for (let i = 0;i < project.length;i++) {
            if (projects[i] == project) {
                projects = projects.slice(0, i).concat(projects.slice(i+1, projects.length));
                break;
            }
        }
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