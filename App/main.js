'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Animated
} = React;

var LaunchView = require('./LaunchView/Launch');
var NewsApp = require('./News/NewsApp');

var DailyApp = React.createClass({

  _beginShowMainView: function() {
    var self = this;
    Animated.timing(this.state.launchViewOpacity, {
      toValue: 0
    }).start(function() {
      self.setState({
        launchViewEnded: true
      });
      Animated.timing(self.state.mainViewOpacity, {
        toValue: 1
      }).start();
    });
  },

  _onLaunchAnimationEnd: function() {
    this._beginShowMainView();
  },

  getInitialState: function() {
    return {
      launchViewEnded: false,
      launchViewOpacity: new Animated.Value(1.0),
      mainViewOpacity: new Animated.Value(0.2)
    };
  },

  render: function() {
    var mainView = this.state.launchViewEnded ? 
      <Animated.View style={[styles.container, {opacity: this.state.mainViewOpacity}]}><NewsApp /></Animated.View>
      :
      <Animated.View style={[styles.container, {opacity: this.state.launchViewOpacity}]}><LaunchView onAnimationEnd={this._onLaunchAnimationEnd} style={styles.mainView}/></Animated.View>;
    return mainView;
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = DailyApp;
