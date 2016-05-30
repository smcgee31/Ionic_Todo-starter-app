angular.module('todo')
.controller('TodoCtrl', ($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) => {

    $scope.tasks = [];
    // A utility function for creating a new project
    // with the given projectTitle
    let createProject = (projectTitle) => {
        let newProject = Projects.newProject(projectTitle);
        $scope.projects.push(newProject);
        Projects.save($scope.projects);
        $scope.selectProject(newProject, $scope.projects.length-1);
    };

    // Load or initialize projects
    $scope.projects = Projects.all();

    // Grab the last active, or the first project
    $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

    // Called to create a new project
    $scope.newProject = () => {
        const projectTitle = prompt('Project name');
        if(projectTitle) {
            createProject(projectTitle);
        }
    };

    // Called to select the given project
    $scope.selectProject = (project, index) => {
        $scope.activeProject = project;
        Projects.setLastActiveIndex(index);
        $ionicSideMenuDelegate.toggleLeft(false);
    };

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('new-task.html', (modal) => {
        $scope.taskModal = modal;
    },
    {
        scope: $scope,
        // animation: 'slide-in-up'
    });

    // Called wehn the form is submitted
    $scope.createTask = (task) => {
        if(!$scope.activeProject || !task) {
            return;
        }
        $scope.activeProject.tasks.push({
            title: task.title
        });
        $scope.taskModal.hide();
        // Inefficient, but save all the projects
        Projects.save($scope.projects);

        task.title = "";
    };

    // Open our new task modal
    $scope.newTask = () => {
        $scope.taskModal.show();
    };

    // Close the new task modal
    $scope.closeNewTask = () => {
        $scope.taskModal.hide();
    };

    $scope.toggleProjects = () => {
        $ionicSideMenuDelegate.toggleLeft();
    };

    // Try to create the first project, make sure to defer
    // this by using $timeout so everything is initialized
    // properly
    $timeout(() => {
        if($scope.projects.length === 0) {
            while(true) {
                const projectTitle = prompt('Your first project title:');
                if(projectTitle) {
                    createProject(projectTitle);
                    break;
                }
            }
        }
    }, 1000);

});
