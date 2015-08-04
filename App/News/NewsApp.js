'use strict';

var React = require('react-native');
var {
  StyleSheet,
  NavigatorIOS
} = React;

var NewsList = require('./NewsList');
var CONSTANT = require('./CONSTANT');

var NewsApp = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        translucent={false}
        shadowHidden={true}
        titleTextColor={'#fff'}
        tintColor={'#fff'}
        barTintColor={CONSTANT.NAV_BAR_BG}
        initialRoute={{
          title: '知乎日报',
          component: NewsList,
          backButtonTitle: '返回'
        }}/>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = NewsApp;
