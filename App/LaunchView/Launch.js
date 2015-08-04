'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Image,
  Animated
} = React;

var Dimensions = require('Dimensions');

var DEVICE_WIDTH = Dimensions.get('window').width;
var DEVICE_HEIGHT = Dimensions.get('window').height;

var API = require('../api');
var IMAGE_WIDTH = 380;
var IMAGE_HEIGHT = 592;

var DailyApp = React.createClass({

  _loadImageInfo: function() {
    var self = this;

    fetch(API.START_IMAGE)
      .then((response) => response.json())
      .then((info) => {
        self.setState({
          netAuthor: info.text,
          // netImageSource: info.img
        });
      })
      .done();
  },

  _beginAnimation: function() {
    var self = this;

    Animated.parallel([
      Animated.spring(this.state.imageScale, {
        toValue: 1.1,
        friction: 8,
        tension: 6,
      }),
      Animated.spring(this.state.infoOpacity, {
        toValue: 1.0,
        friction: 8,
        tension: 6,
      }),
      Animated.spring(this.state.infoPositionY, {
        toValue: 0,
        friction: 8,
        tension: 6,
      })
    ]).start(function() {
      if (self.props.onAnimationEnd) {
        self.props.onAnimationEnd();
      }
    });
  },



  getInitialState: function() {
    return {
      imageWidth: DEVICE_WIDTH,
      imageHeight: DEVICE_HEIGHT,
      netImageSource: null,
      netAuthor: 'by @qfliu_farmer',

      imageScale: new Animated.Value(1.0),
      infoPositionY: new Animated.Value(-60),
      infoOpacity: new Animated.Value(0.0)
    };
  },

  componentDidMount: function() {
    var imageWidth = DEVICE_WIDTH;
    var imageHeight = DEVICE_HEIGHT;

    if (IMAGE_WIDTH / IMAGE_HEIGHT < DEVICE_WIDTH / DEVICE_HEIGHT) {
      imageWidth = DEVICE_WIDTH;
      imageHeight = DEVICE_WIDTH / IMAGE_WIDTH * IMAGE_HEIGHT;
    } else {
      imageHeight = DEVICE_HEIGHT;
      imageWidth = DEVICE_HEIGHT / IMAGE_HEIGHT * IMAGE_WIDTH;
    }

    this.setState({
      imageWidth: imageWidth,
      imageHeight: imageHeight
    });

    // this._loadImageInfo();
    this._beginAnimation();
  },

  render: function() {
    var launchImage = this.state.netImageSource == null ? 
      <Animated.Image source={require('image!LaunchImage')} style={[{width: this.state.imageWidth, height: this.state.imageHeight}, {transform: 
        [{
          scale: this.state.imageScale
        }]}]}/>
      :
      <Image source={{uri: this.state.netImageSource}} style={{backgroundColor: '#898989', width: this.state.imageWidth, height: this.state.imageHeight}}/>;
    return (
      <View style={styles.container}>
        {launchImage}
        <Animated.View style={[styles.infoContainer, {
          opacity: this.state.infoOpacity,
          transform: [
            {translateY: this.state.infoPositionY}
          ]}]}>
          <Text style={styles.appTitle}>{'知乎日报'}</Text>
          <Text style={styles.authorInfo}>{this.state.netAuthor}</Text>
        </Animated.View>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  appTitle: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 10
  },
  authorInfo: {
    fontSize: 12,
    color: '#fff'
  }
});


module.exports = DailyApp;
