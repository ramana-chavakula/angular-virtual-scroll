(function () {
  var app = angular.module('angularVirtualScroll', []);
  app.directive('virtualScroll', ['$filter', '$timeout', '$log', function ($filter, $timeout, $log) {
    return {
      restrict: 'A',
      controller: ['$scope', function ($scope) {
        $scope.virtualRepeat.triggerMargin = $scope.virtualRepeat.triggerMargin || 0;
        $scope.virtualScrollFilter = function (input, index) {
          if (index >= $scope.virtualRepeat.range.start && index < $scope.virtualRepeat.range.end) {
            return input;
          }
        };
      }],
      link: function (scope, element, attrs) {
        var scrollTopTimer, addScrollHandlerTimer;

        var moveScrollTo = function (position) {
          element.off("scroll");
          // clearing any existing timers
          $timeout.cancel(scrollTopTimer);
          $timeout.cancel(addScrollHandlerTimer);
          scrollTopTimer = $timeout(function() {
            element.scrollTop(position);
            $log.debug('scroll-position: ', element.scrollTop());
          }, 0); 
          addScrollHandlerTimer = $timeout(function() {
            element.on("scroll", scrollHandler);
          }, 100);
        };

        function scrollHandler (event) {
          if (angular.element(this)[0].scrollHeight - angular.element(this).scrollTop() <= angular.element(this).outerHeight() + scope.virtualRepeat.triggerMargin) {
            if (scope.virtualRepeat.range.end < scope.virtualRepeat.maxSize) {
              scope.virtualRepeat.range.start += scope.virtualRepeat.INCREMENT_SIZE;
              scope.virtualRepeat.range.end += scope.virtualRepeat.INCREMENT_SIZE;
              //if remaining items are less than virtual repeat INCREMENT_SIZE
              if (scope.virtualRepeat.maxSize - scope.virtualRepeat.range.end < scope.virtualRepeat.INCREMENT_SIZE) {
                scope.virtualRepeat.range.end = scope.virtualRepeat.maxSize;
              }
              var position = element.find('>.virtual-scroll-item').eq(scope.virtualRepeat.ITEMS_SIZE - scope.virtualRepeat.INCREMENT_SIZE - 1).position().top || 0;
              moveScrollTo(position);
            }
          }
          if (angular.element(this).scrollTop() <= scope.virtualRepeat.triggerMargin) {
            if (scope.virtualRepeat.range.start > 0) {
              //if any remaining items are added throught INCREMENT
              if (scope.virtualRepeat.range.end == scope.virtualRepeat.maxSize) {
                scope.virtualRepeat.range.end = scope.virtualRepeat.range.start + scope.virtualRepeat.ITEMS_SIZE;
              }
              scope.virtualRepeat.range.start -= scope.virtualRepeat.INCREMENT_SIZE;
              scope.virtualRepeat.range.end -= scope.virtualRepeat.INCREMENT_SIZE;
              var position = element.find('>.virtual-scroll-item').eq(scope.virtualRepeat.INCREMENT_SIZE).position().top || 0;
              moveScrollTo(position); 
            }
          }
        };
        element.on("scroll", scrollHandler);
        scope.$on('$destroy', function () {
          element.off("scroll");
        });
      }
    };
  }]);
})();