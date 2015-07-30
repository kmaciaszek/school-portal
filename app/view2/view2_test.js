'use strict';

describe('myApp module', function() {

  beforeEach(module('myApp'));

  describe('view2 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl = $controller('View2Ctrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});