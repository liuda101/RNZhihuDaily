'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  WebView
} = React;

var Dimensions = require('Dimensions');

var ScrollCard = React.createClass({

  getInitialState: function() {
    return {
      currentPage: 0,
      scrollDatas: []
    };
  },

  componentDidMount: function() {
    this.setState({
      scrollDatas: this.props.scrollDatas
    });
    this.refs.scrollView.scrollWithoutAnimationTo(0, Dimensions.get('window').width);
  },

  onScrollEnd: function(e) {
    var scrollX = e.nativeEvent.contentOffset.x;
    var page = 0;
    if (scrollX === Dimensions.get('window').width * 2) {
      page ++;
    } else if (scrollX == 0){
      page --;
    }
    var cp = this.state.currentPage;
    cp += page;
    if (cp < 0) {
      cp = this.state.scrollDatas.length - 1;
    }
    if (cp == this.state.scrollDatas.length) {
      cp = 0;
    }
    this.setState({
      currentPage: cp
    });
    this.refs.scrollView.scrollWithoutAnimationTo(0, Dimensions.get('window').width);
  },

  render: function() {
    var self = this;

    return (
      <View style={styles.container}>
        <ScrollView 
          ref='scrollView'
          styles={styles.scrollCard}
          horizontal={true} 
          directionalLockEnabled={true}
          automaticallyAdjustContentInsets={false}
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={self.onScrollEnd}>

          {self._renderCards()}

        </ScrollView>

        <View style={styles.page}>
          {this.state.scrollDatas.map(function(card, index) {
            return (
              <View style={[styles.pageDot, index === self.state.currentPage ? styles.activeDot : styles.normalDot]} />
            );
          })}
        </View>
      </View>
    );
  },

  _renderCards: function() {
    var cardData = [];
    var cards = this.state.scrollDatas;

    if (cards.length === 0) {
      return null;
    }

    if (this.state.currentPage == 0) {
      cardData.push(this.state.scrollDatas[cards.length - 1]);
    } else {
      cardData.push(cards[this.state.currentPage - 1]);
    }

    cardData.push(cards[this.state.currentPage]);

    if (this.state.currentPage == cards.length - 1) {
      cardData.push(cards[0]);
    } else {
      cardData.push(cards[this.state.currentPage + 1]);
    }

    return cardData.map(function(card) {
      // Image don't load image... fuck it!
      return (
        <WebView style={styles.card} scrollEnabled={false} html={'<body style="padding:0; margin:0;"><img src="' + card.image + '" / style="margin:0; width:100%;"></body>'} />
      );
      // return (
      //   <View style={styles.card}>
      //     <Image style={styles.image} source={{uri: 'http://loremflickr.com/640/480/dog'}} onLoadStart={() => console.log('onLoadStart')}
      //       onLoadError={() => console.log('error')} onLoadProgress={() => console.log('onLoadProgress')}>
      //       <View style={styles.titleBg}>
      //         <Text style={styles.title}>{card.title}</Text>
      //       </View>
      //     </Image>
      //   </View>
      // );
    });
  }

});


var styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width
  },
  scrollCard: {
    flex: 1,
    backgroundColor: '#cdcdcd'
  },
  card: {
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width,
    backgroundColor: '#ccc'
  },
  page: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 10,
    height: 4,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageDot: {
    width: 4,
    height: 4,
    marginLeft: 6,
    borderRadius: 2
  },
  activeDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  normalDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  image: {
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width
  },
  titleBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end'
  },
  title: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20
  }
});

module.exports = ScrollCard;