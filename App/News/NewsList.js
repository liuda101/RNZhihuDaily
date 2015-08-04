'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text
} = React;

var DailyApp = React.createClass({

  _onLaunchAnimationEnd: function() {

  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text>{'i'}</Text>
      </View>
    );
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  launchView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});

module.exports = DailyApp;
