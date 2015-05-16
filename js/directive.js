angular.module('locator.directives', []).directive('select', function () {
    return {
        scope: {
            values: '=',
            'selectedModel': '=',
            'multiple': '='
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
        templateUrl: '../template/list.html'
    };
});
