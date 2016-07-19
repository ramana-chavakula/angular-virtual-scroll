# angular-virtual-scroll
just include angularVirtualScroll as dependency to your module say

```
var app = angular.module("sampleApp", ["angularVirtualScroll"]);
```

and include virtualScroll directive as an attribute for which you want to aplly virtual scroll say

```
<div virtual-scroll class="items-wrapper">
  <div ng-repeat="item in items">..</div>
</div>
```

and define virtualRepeat options in controller say
```
  $scope.virtualRepeat = {
    'INCREMENT_SIZE': 5, 
    'ITEMS_SIZE': 10,
    range = {
      start: 0,
      end: 10
    },
    'maxSize': $scope.items.length
  };
```

**maxSize** is the total length of items.

**ITEMS_SIZE** is the count of items say in dom at a time say from our example you can view 10 items at time.

**INCREMENT_SIZE** is the buffered count of items we maintain ie., we we scroll down we will add 5 items at the bottom and remove 5 items at the top vice versa we we reach top.

**range** is what we used internally to maintain the virtual scroll but i am exposing range because you can reset the virtual scroll postion manually using this range object in virtualRepeat options.

**Example** ``range: {start: 5, end: 15}`` which means you can view the items starting from index 5 to 15.
