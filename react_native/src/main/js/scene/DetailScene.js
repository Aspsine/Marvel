'use strict';
import React, {Component,} from 'react';
import {StyleSheet, View, ToolbarAndroid, Image, Text} from 'react-native';

class DetailScene extends Component {

  constructor(props){
    super(props);

    this.onBackPressed = this.onBackPressed.bind(this);
  }

  onBackPressed(){
    this.props.navigator.pop();
  }

  render(){
    return (
      <View style={styles.root}>
        <ToolbarAndroid
          titleColor='white'
          onIconClicked={this.onBackPressed}
          navIcon={require('image!android_back_white')}
          style={styles.toolbar}
          title={this.props.character.name}/>

        <View style={styles.container}>
          <Image 
            style={styles.avatar}
            source={{uri:this.props.character.avatar}}/>
          <Text style={styles.name}>{this.props.character.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    backgroundColor:'white',
    flex:1,
    flexDirection:'column',
  },
  toolbar:{
    height:56,
    backgroundColor:'#ff0000',
  },
  container:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
  },
  avatar:{
    borderWidth:4,
    borderColor:'black',
    borderRadius:100,
    marginTop:20,
    height:200,
    width:200,
  },
  name:{
    fontSize:30,
    marginTop:20,
  }
});

module.exports=DetailScene;