'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicatorIOS,
  Animated
} = React;

var Dimensions = require('Dimensions');
var DEVICE_WIDTH = Dimensions.get('window').width;
var API = require('../api');

var HTMLWebView = require('react-native-html-webview');


var NewsDetail = React.createClass({

  _loadNews: function() {
    fetch(API.NEWS_DETAIL + this.props.data.id)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          isLoading: false,
          html: result.body + '<link type="text/css" rel="stylesheet" href="' + result.css[0] + '" />'
        });
      })
      .done();
  },

  _renderLoading: function() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicatorIOS />
      </View>
    );
  },

  _renderContent: function() {
    return (
      <ScrollView
        style={styles.container}
        contentInset={{top: 0, bottom: 64}}
        automaticallyAdjustContentInsets={false}>

        <View>
          <HTMLWebView html={this.state.html} style={{width: DEVICE_WIDTH, marginTop: -200}} autoHeight={true} makeSafe={false}/>
        </View>

      </ScrollView>
    );
  },

  componentDidMount: function() {
    this._loadNews();
  },

  getInitialState: function() {
    return {
      isLoading: true,
      html: ''
    };
  },

  render: function() {
    var toRender = this.state.isLoading ? this._renderLoading() : this._renderContent();
    return toRender;
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    position: 'absolute',
    height: 200,
    width: DEVICE_WIDTH,
    backgroundColor: '#ccc'
  }
});


module.exports = NewsDetail;
