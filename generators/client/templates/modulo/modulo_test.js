'use strict';

describe('coreApp.<%= generatorName %> module', function() {

  beforeEach(module('coreApp.<%= generatorName %>'));

  describe('<%= generatorName %> controller', function() {

    it('should ....', inject(function($controller) {
      //spec body
      var <%= generatorName %> Ctrl = $controller('<%= generatorModel %>Ctrl');
      expect( <%= generatorName %> Ctrl).toBeDefined();
    }));

  });
});
