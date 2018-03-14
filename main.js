(function (app) {
  'use strict';

  app.controller('SimpleArrayCtrl', ['$scope', function SimpleArrayCtrl($scope) {
    // classes
    $scope.classes = ['Maths', 'Physics', 'Telugu', 'Chemistry'];

    // selected classes
    $scope.selection = ['Maths', 'Telugu'];

    // toggle selection for a given class by name
    $scope.toggleSelection = function toggleSelection(className) {
      var idx = $scope.selection.indexOf(className);

      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.selection.push(className);
      }
    };
  }]);

  app.controller('ObjectArrayCtrl', ['$scope', 'filterFilter', function ObjectArrayCtrl($scope, filterFilter) {
    // classes
    $scope.classes = [
      { name: 'Maths',    selected: true },
      { name: 'Physics',   selected: false },
      { name: 'Telugu',     selected: true },
      { name: 'Chemistry', selected: false }
    ];

    // selected classes
    $scope.selection = [];

    // helper method
    $scope.selectedClasses = function selectedClasses() {
      return filterFilter($scope.classes, { selected: true });
    };

    // watch classes for changes
    $scope.$watch('classes|filter:{selected:true}', function (nv) {
      $scope.selection = nv.map(function (session) {
        return session.name;
      });
    }, true);
  }]);

  /**
   * custom filter
   */
  app.filter('classSelection', ['filterFilter', function (filterFilter) {
    return function classSelection(input, prop) {
      return filterFilter(input, { selected: true }).map(function (session) {
        return session[prop];
      });
    };
  }]);
})(angular.module('app', []));
