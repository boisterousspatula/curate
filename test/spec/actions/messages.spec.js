/**
*   Messages Actions Spec Test
*/


'use strict';

var messagesActions = require('../../../client/scripts/actions/messages');

describe('Messages Actions', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
  });

  it('provides the "Messages Actions"', function() {
    // Expect it to exist
    expect(messagesActions).to.be.ok;
  });

});
