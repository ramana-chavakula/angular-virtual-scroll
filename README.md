# angular-virtual-scroll

use ``bower install angular-virtualScroll`` and just include angularVirtualScroll as dependency to your module say

```
var app = angular.module("sampleApp", ["angularVirtualScroll"]);
```

and include virtualScroll directive as an attribute for which you want to aplly virtual scroll
and add class="virtual-scroll-item" & filter: virtualScrollFilter for the ng-repeat which was and immediate child to virtualScroll directive say

```
<div virtual-scroll class="items-wrapper">
  <div class="virtual-scroll-item" ng-repeat="item in items | filter: virtualScrollFilter">..</div>
</div>
```

and define virtualRepeat options in controller say
```
  $scope.virtualRepeat = {
    'INCREMENT_SIZE': 5, 
    'ITEMS_SIZE': 10,
    'range': {
      'start': 0,
      'end': 10
    },
    'maxSize': $scope.items.length,
    'triggerMargin': 0
  };
```

**maxSize** is the total length of items.

**ITEMS_SIZE** is the count of items stay in DOM at a time say from our example you can view 10 items at time.

**INCREMENT_SIZE** is the buffered count of items we maintain ie., when we scroll down we will add 5 items at the bottom and remove 5 items at the top vice versa as we scroll top.

**triggerMargin** is the delta position from scroll top/bottom where the scroll handler has to be triggered to display the next or perious records.

**Example** ``triggerMargin: 10`` which means that now we will increment the buffer when the scroll reached 10px above the end postion or 10px before the starting position.

**range** is what we used internally to maintain the virtual scroll but I am exposing range because we can reset the virtual scroll postion manually using this range object in virtualRepeat options.

**Example** ``range: {start: 5, end: 15}`` which means you can view the items starting from index 5 to 15.
