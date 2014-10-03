'use strict';

/**
 * Verifies propTypes assignaling for the
 * components that we are using.
 */

jest.autoMockOff();

describe('Components', function() {
  var React;
  var TU;
  var Components;

  beforeEach(() => {
    React = require('react/addons');
    TU = React.addons.TestUtils;

    Components = {
      Application: require('../Application.jsx'),
      Visualization: require('../Visualization.jsx'),
      LayerOpts: require('../Settings/LayerOpts.jsx'),
      MachineOpts: require('../Settings/MachineOpts.jsx'),
      Settings: require('../Settings/Settings.jsx'),
    };
  });
});
