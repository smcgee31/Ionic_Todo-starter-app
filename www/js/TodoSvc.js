angular.module('todo')
    .service('TodoSvc', function() {

        let tasks = [
            {title: 'Collect coins'},
            {title: 'Eat mushrooms'},
            {title: 'Get high enought to grab the flag'},
            {title: 'Find the Princess'}
        ];

        this.getTasks = function() {
            return tasks;
        };

});
