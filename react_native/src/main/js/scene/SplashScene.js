'use strict';

import React, {Component} from 'React';
import {StyleSheet, View, Text} from 'react-native'

const TIME_OUT = 500;

class SplashScene extends Component{

  constructor(props){
    super(props);
    this.gotoFeedScene = this.gotoFeedScene.bind(this);
  }

  componentDidMount(){
    setTimeout(this.gotoFeedScene, TIME_OUT);
  }

  gotoFeedScene(){
    var route = {name:'feed'};
    this.props.navigator.replace(route);
  }

	render(){
		return (
      <View style={styles.container}>
  			<Text style={styles.text}>
          MARVEL
        </Text>
      </View>
    );
	}
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#111111',
  },
  text: {
    padding:4,
    textAlign:'center',
    textAlignVertical:'center',
    color:'#ffffff',
    backgroundColor:'#ff0000',
    fontSize:50,
  },
});

module.exports = SplashScene;