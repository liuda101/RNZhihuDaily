'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text
} = React;

var LaunchView = require('./LaunchView/Launch');

var DailyApp = React.createClass({

  _onLaunchAnimationEnd: function() {
    console.log('aa');
  },

  render: function() {
    return (
      <LaunchView onAnimationEnd={this._onLaunchAnimationEnd}/>
    );
  }

});


module.exports = DailyApp;
