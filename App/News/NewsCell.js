'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Image
} = React;

var CONSTANT = require('./CONSTANT');

var Dimensions = require('Dimensions');

var DEVICE_SCALE = Dimensions.get('window').scale;

var API = require('../api');

var NewsCell = React.createClass({

  _onPress: function() {
    if (this.props.onPress) {
      this.props.onPress(this.props.data);
    }
  },

  render: function() {
    var theImage = (<Image style={styles.img}><Text style={styles.loadingText}>{'Loading'}</Text></Image>);

    return (
      <TouchableHighlight underlayColor={CONSTANT.TAP_COLOR} onPress={this._onPress}>
        <View style={styles.cellContainer}>
          <Text style={styles.title}>{this.props.data.title}</Text>
          {theImage}
        </View>
      </TouchableHighlight>
    );
  }

});


var styles = StyleSheet.create({
  cellContainer: {
    marginHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 1 / DEVICE_SCALE,
    borderBottomColor: '#ddd'
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  img: {
    width: 75,
    height: 50,
    marginLeft: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    fontSize: 10,
    color: '#ddd'
  }
});

module.exports = NewsCell;
