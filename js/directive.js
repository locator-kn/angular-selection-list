"use strict";

angular.module('locator.selection', []).directive('listSelection', function () {

    var template = [
        '<div ng-if="!multiple" class="relative selection" ng-class="{open: opened}"><a ng-click="trigger()"><img ng-if="icon" class="icon" ng-src="data:image/gif;base64,{{value.icon}}"> <span class="title">{{selectedModel.title}}</span></a>',
        '<ul class="sub">',
        '<li ng-click="select(value)" ng-repeat="value in values">{{value.title}}</li>',
        '</ul>',
        '</div>',

        '<div ng-if="multiple" class="relative selection" ng-class="{open: opened}"><span class="fullwidth" ng-repeat="value in selectedModel">',
        '<a ng-click="trigger()"><img ng-if="icon" class="icon" ng-src="data:image/gif;base64,{{value.icon}}"> <span class="title">{{value.title}}</span></a><span ng-if="twoPlus()" class="remove_item" ng-click="remove(value)">X</span></span>',
        '<ul class="sub">',
        '<li ng-click="select(item)" ng-repeat="item in values">{{item.title}}</li>',
        '</ul>',
        '</div>'
    ];

    return {
        scope: {
            values: '=',
            'selectedModel': '=',
            'multiple': '=',
            'icon': '='
        },

        controller: function ($scope, hotkeys, $timeout, $rootScope) {

            //handle open/close
            $scope.opened = false;
            $scope.trigger = function () {
                $scope.opened = !$scope.opened;
            };

            $scope.remove = function (value) {
                var i = $scope.selectedModel.indexOf(value);
                $scope.selectedModel.splice(i, 1);
            };

            //returns true, if the list contains more than one item
            $scope.twoPlus = function () {
                return $scope.selectedModel.length > 1;
            };


            $scope.select = function (value) {

                if ($scope.multiple) {
                    if ($.inArray(value, $scope.selectedModel) == -1) {
                        $scope.selectedModel.push(value);
                    }

                } else {
                    $scope.selectedModel = value;
                }

                $scope.trigger();
            };


        },
        link: function ($scope) {
            $scope.$watch('selectedModel', function (newValue) {
                if (newValue && $scope.multiple) {

                    if ($scope.selectedModel instanceof Array) {
                        // !$scope.selectedModel instanceof Array is not working properly, todo.
                    } else {
                        $scope.selectedModel = [$scope.selectedModel];
                    }
                }
            }, true);
        },
        template: template.join('')
    };
});
