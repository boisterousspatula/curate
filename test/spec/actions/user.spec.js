/**
*   User Action Spec Test
*/


'use strict';

var userActions = require('../../../client/scripts/actions/user');

describe('User Action', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
  });

  it('provides the "User Action"', function() {
    // Expect it to exist
    expect(userActions).to.be.ok;
  });

});
