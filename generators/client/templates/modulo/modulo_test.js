'use strict';

describe('coreApp.<%= generatorName %> module', function() {

  beforeEach(module('coreApp.<%= generatorName %>'));

  describe('<%= generatorName %> controller', function() {

    it('should ....', inject(function($controller) {
      //spec body
      var <%= generatorName %>Controller = $controller('<%= generatorModel %>Controller');
      expect( <%= generatorName %>Controller).toBeDefined();
    }));

  });
});
