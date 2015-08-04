'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  View,
  Text,
  Image,
  WebView
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
          html: result.body + '<link type="text/css" rel="stylesheet" href="' + result.css[0] + '" />'
        });
      })
      .done();
  },

  componentDidMount: function() {
    this._loadNews();
  },

  getInitialState: function() {
    return {
      html: 'loading...'
    };
  },

  render: function() {
    return (
      <ScrollView
        style={styles.container}
        contentInset={{top: 0, bottom: 64}}
        automaticallyAdjustContentInsets={false}>
        
        
        <HTMLWebView html={this.state.html} style={{width: DEVICE_WIDTH}} autoHeight={true} makeSafe={false}/>

      </ScrollView>
    );
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 120,
    width: DEVICE_WIDTH,
    backgroundColor: '#ccc'
  }
});


module.exports = NewsDetail;
