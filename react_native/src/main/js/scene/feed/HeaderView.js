import React, {Component,} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ViewPagerAndroid,
  ToastAndroid,
  Image,
} from 'react-native';

class HeaderView extends Component{

  constructor(props){
    super(props);

    this.state={
      currentSelectedPage:this.props.currentSelectedPage,
    };

    this.onPageSelected = this.onPageSelected.bind(this);
  }

  onPageSelected(e){
    this.setState({
      currentSelectedPage:e.nativeEvent.position,
    });
  }

  //FIXME here has some bugs.
  onItemClick(character, i){
      // this.props.onItemClick(character, i);
  }

  render(){
    var characters = this.props.characters;
    var pages=[];
    var indicators=[];
    for (var i = 0; i < characters.length; i++) {
      var character = characters[i];

      pages.push(
        <View
          key={i}
          style={styles.viewPagerItem}> 
          <TouchableOpacity
            onPress={this.onItemClick(character, i)}>
            <Image
              style={styles.viewPagerItemImage}
              source={{uri:character.avatar}}
              />
          </TouchableOpacity>
        </View>
      );

      indicators.push(
        <View 
          key={i}
          style={[styles.indicator, i == this.state.currentSelectedPage ? styles.indicatorSelected : {}]}/>
      );
    }

    return (
      <View>
        <Image 
            style={styles.viewPagerBg}
            source={{uri:this.props.backgroundUrl}}/>
        <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={this.state.currentSelectedPage}
          onPageSelected={this.onPageSelected}>
          {pages}
        </ViewPagerAndroid>
        <View style={styles.indicatorContainer}>
          {indicators}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  indicatorContainer:{
    height:36,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingRight:18,
    position:'absolute',
    right:0,
    bottom:0,
  },
  indicator:{
    width:6,
    height:6,
    marginLeft:6,
    borderRadius:3,
    backgroundColor:'white',
  },
  indicatorSelected:{
    backgroundColor:'red',
  },
  viewPager:{
    height:240,
  },
  viewPagerBg:{
    height:240,
    left:0,
    right:0,
    position:'absolute',
  },
  viewPagerItem:{
    height:240,
  },
  viewPagerItemImage:{
    resizeMode:'contain',
    height:240,
  },
});

module.exports=HeaderView;
