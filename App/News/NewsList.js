'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ListView,
  TouchableHighlight,
  View,
  Text,
  Image
} = React;

var API = require('../api');

var NewsCell = require('./NewsCell');
var NewsDetail = require('./NewsDetail');

var NewsList = React.createClass({

  _onRowPress: function(data) {
    this.props.navigator.push({
      title: '详情',
      component: NewsDetail,
      passProps: {data: data}
    });
  },

  _loadNews: function() {
    fetch(API.LATEST_NEWS)
      .then((response) => response.json())
      .then((result) => {
        this._fillRows(result);
      })
      .done();
  },

  _fillRows: function(newsList) {
    Array.prototype.push.apply(this.allNews, newsList.stories);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.allNews)
    });
  },

  _renderRow: function(rowData, section, row) {
    return (
      <NewsCell data={rowData} onPress={this._onRowPress}/>
    );
  },

  componentDidMount: function() {
    this.allNews = [];

    this._loadNews();
  },

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  },

  render: function() {
    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow} />
    );
  }

});

module.exports = NewsList;
