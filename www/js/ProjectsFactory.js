angular.module('todo')
.factory('Projects', () => {

    return {
        all: () => {
            let projectString = window.localStorage.projects;
            if (projectString) {
                return angular.fromJson(projectString);
            }
            return [];
        },
        save: (projects) => {
            window.localStorage.projects = angular.toJson(projects);
        },
        newProject: (projectTitle) => {
            // Add a new project
            return {
                title: projectTitle,
                tasks: []
            };
        },
        getLastActiveIndex: () => {
            return parseInt(window.localStorage.lastActiveProject) || 0;
        },
        setLastActiveIndex: (index) => {
            window.localStorage.lastActiveProject = index;
        }
    };

});
