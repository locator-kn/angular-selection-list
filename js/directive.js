"use strict";

angular.module('locator.selection', []).directive('listSelection', function() {

    var template = [
        '<div ng-if="values.length === 1" class="selection not-selectable" ng-class="{open: selectedName === openElement}"><a><img ng-if="icon" class="icon" ng-src="data:image/gif;base64,{{value.icon}}"> <span class="title">{{selectedModel.title}}</span></a>',
        '</div>',

        '<div ng-if="(values.length > 1 && !multiple)" active-popover click-value="selectedName" compare-to="mc.openElement" class="selection" ng-class="{open: selectedName === openElement}"><a ng-click="trigger()"><img ng-if="icon" class="icon" ng-src="data:image/gif;base64,{{value.icon}}"> <span class="title">{{selectedModel.title}}</span></a>',
        '<ul class="sub">',
        '<h2 ng-if="title">{{title}}<span ng-if="boldtitle" class="bold"">{{boldtitle}}</span></h2>',
        '<li ng-if="!selected(value)" ng-click="select(value)" ng-repeat="value in values"><img ng-if="icons" class="list-icon" ng-src="images/icons/moods_white/{{value.icon}}"> {{value.title}}</li>',
        '</ul>',
        '</div>',

        '<div ng-if="multiple" class="relative selection" active-popover click-value="selectedName" compare-to="mc.openElement" ng-class="{open: selectedName === openElement}><span class="fullwidth" ng-repeat="value in selectedModel">',
        '<a ng-click="trigger()"><img ng-if="icon" class="icon" ng-src="data:image/gif;base64,{{value.icon}}"> <span class="title">{{value.title}}</span></a><span ng-if="twoPlus()" class="remove_item" ng-click="remove(value)">X</span></span>',
        '<ul class="sub">',
        '<li ng-if="!selected(item)" ng-click="select(item)" ng-repeat="item in values">{{item.title}}</li>',
        '</ul>',
        '</div>'
    ];

    return {
        scope: {
            'title': '=',
            'boldtitle': '=',
            'values': '=',
            'selectedModel': '=',
            'multiple': '=',
            'icons': '=',
            'selectedName': '=',
            'openElement': '='
        },

        controller: function($scope, hotkeys, $timeout, $rootScope, lodash) {


            //handle open/close
            $scope.opened = false;

            $scope.trigger = function() {

                if ($scope.selectedModel.length < $scope.values.length || !$scope.multiple) {
                    $scope.opened = !$scope.opened;
                }
            };

            $scope.remove = function(value) {
                var i = $scope.selectedModel.indexOf(value);
                $scope.selectedModel.splice(i, 1);
            };

            //returns true, if the list contains more than one item
            $scope.twoPlus = function() {
                return $scope.selectedModel.length > 1;
            };


            $scope.select = function(value) {

                if ($scope.multiple) {
                    if ($.inArray(value, $scope.selectedModel) == -1) {
                        $scope.selectedModel.push(value);
                    }

                } else {
                    $scope.selectedModel = value;
                }

                $scope.opened = false;
            };


            $scope.selected = function(value) {
                if (!value || !$scope.selectedModel) {
                    return false;
                }
                value.id = value.id || value._id;

                if ($scope.multiple) {
                    // multi comparison

                    return !!lodash.find($scope.selectedModel, function(item) {
                        return item._id === value._id;
                    });

                } else {

                    // single comparison
                    if (value.id == $scope.selectedModel.id) {
                        return true;
                    }
                }
            };
        },
        link: function($scope) {
            $scope.$watch('selectedModel', function(newValue) {
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