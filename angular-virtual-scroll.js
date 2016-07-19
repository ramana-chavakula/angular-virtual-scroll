(function () {
  var app = angular.module('angularVirtualScroll', []);
  app.directive('virtualScroll', ['$filter', '$timeout', function ($filter, $timeout) {
    return {
      restrict: 'A',
      controller: ['$scope', function ($scope) {
        $scope.virtualScrollFilter = function (input, index) {
          if (index >= $scope.virtualRepeat.range.start && index < $scope.virtualRepeat.range.end) {
            return input;
          }
        };
      }],
      link: function (scope, element, attrs) {
        var moveScrollTo = function (position) {
          element.off("scroll", scrollHandler);
          $timeout(function() {
            element.scrollTop(position);
            console.log('scroll-position: ', element.scrollTop());
          }, 0); 
          $timeout(function() {
            element.on("scroll", scrollHandler);
          }, 100);
        };

        function scrollHandler (event) {
          if (angular.element(this)[0].scrollHeight - angular.element(this).scrollTop() <= angular.element(this).outerHeight() + 10) {
            if (scope.virtualRepeat.range.end < scope.virtualRepeat.maxSize) {
              scope.virtualRepeat.range.start += scope.virtualRepeat.INCREMENT_SIZE;
              scope.virtualRepeat.range.end += scope.virtualRepeat.INCREMENT_SIZE;
              //if remaining items are less than virtual repeat INCREMENT_SIZE
              if (scope.virtualRepeat.maxSize - scope.virtualRepeat.range.end < scope.virtualRepeat.INCREMENT_SIZE) {
                scope.virtualRepeat.range.end = scope.virtualRepeat.maxSize;
              }
              var position = element.find('>[data-ng-repeat]').eq(scope.virtualRepeat.ITEMS_SIZE - scope.virtualRepeat.INCREMENT_SIZE - 1).position().top || 0;
              moveScrollTo(position);
            }
          }
          if (angular.element(this).scrollTop() <= 10) {
            if (scope.virtualRepeat.range.start > 0) {
              //if any remaining items are added throught INCREMENT
              if (scope.virtualRepeat.range.end == scope.virtualRepeat.maxSize) {
                scope.virtualRepeat.range.end = scope.virtualRepeat.range.start + scope.virtualRepeat.ITEMS_SIZE;
              }
              scope.virtualRepeat.range.start -= scope.virtualRepeat.INCREMENT_SIZE;
              scope.virtualRepeat.range.end -= scope.virtualRepeat.INCREMENT_SIZE;
              var position = element.find('>[data-ng-repeat]').eq(scope.virtualRepeat.INCREMENT_SIZE).position().top || 0;
              moveScrollTo(position); 
            }
          }
        };
        element.on("scroll", scrollHandler);
      }
    };
  }]);
})();