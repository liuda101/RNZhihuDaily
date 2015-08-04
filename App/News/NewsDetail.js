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

var API = require('../api');

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
      <WebView html={this.state.html}/>
    );
  }

});

module.exports = NewsDetail;
