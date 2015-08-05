'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ListView,
  TouchableHighlight,
  View,
  Text,
  Image,
  ActivityIndicatorIOS
} = React;

var API = require('../api');

var NewsCell = require('./NewsCell');
var NewsDetail = require('./NewsDetail');
var ScrollCard = require('../ScrollCard/ScrollCard');

var util = require('../util/util');

var CONSTANT = require('./CONSTANT');

var SCROLL_CARD_KEY = 'scrollCard';

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
        this._loadMoreNews();
      })
      .done();
  },

  _loadMoreNews: function() {
    if (this.isLoadingMoreNews) {
      return;
    }

    this.isLoadingMoreNews = true;

    fetch(API.BEFORE_NEWS + this.currentLoadDate)
      .then((response) => response.json())
      .then((result) => {
        this._fillRows(result);
        this.isLoadingMoreNews = false;
      })
      .done();
  },

  _fillRows: function(newsList) {

    if (this.firstSectionId === null) {
      this.firstSectionId = 's' + newsList.date;

      this.allNews[SCROLL_CARD_KEY] = {data: newsList.top_stories};
    }

    // Object.keys 顺序说明: http://w3help.org/zh-cn/causes/SJ9011
    this.allNews['s' + newsList.date] = newsList.stories;
    
    this.currentLoadDate = newsList.date;
    this.allSections.push(newsList.date);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(this.allNews)
    });
  },

  _onEndReached: function() {
    this._loadMoreNews();
  },

  _renderRow: function(rowData, section, row) {
    if (section === SCROLL_CARD_KEY) {
      return (
        <ScrollCard scrollDatas={rowData}/>
      );
    }
    return (
      <NewsCell data={rowData} onPress={this._onRowPress}/>
    );
  },

  _renderSectionHeader: function(sectionData, secitonId) {
    if (secitonId === this.firstSectionId || secitonId === SCROLL_CARD_KEY) {
      return null;
    }
    return (
      <View style={styles.sectionHeader}><Text style={styles.sectionHeaderText}>{util.readableDate(secitonId.substring(1))}</Text></View>
    );
  },

  _renderFooter: function() {
    return (
      <View style={styles.footer}>
        <ActivityIndicatorIOS />
      </View>
    );
  },

  componentDidMount: function() {
    this.allNews = {};
    this.allSections = [];

    this.firstSectionId = null;

    this.isLoadingMoreNews = false;

    this._loadNews();
  },

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (r1, r2) => r1 !== r2
      })
    };
  },

  render: function() {
    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        style={{flex: 1}}
        contentInset={{bottom: 64}}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderSectionHeader={this._renderSectionHeader}
        renderFooter={this._renderFooter}
        onEndReachedThreshold={100}
        onEndReached={this._onEndReached} />
    );
  }

});

var styles = StyleSheet.create({
  sectionHeader: {
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CONSTANT.NAV_BAR_BG
  },
  sectionHeaderText: {
    fontSize: 12,
    color: '#fff'
  },
  footer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

module.exports = NewsList;
