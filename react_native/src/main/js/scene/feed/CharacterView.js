import React, {Component,} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

class CharacterView extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View 
        style={styles.characterContainer}>
        <Image
          style={styles.characterAvatar} 
          source={{uri:this.props.character.avatar}}
        />
        <Text style={styles.characterName}>
          {this.props.character.name}
        </Text>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  characterContainer:{
    flexDirection:'row',
    justifyContent:'center',
    paddingLeft:12,
    paddingRight:12,
    paddingTop:6,
    paddingBottom:6,
  },
  characterAvatar:{
    borderWidth:2,
    borderColor:'black',
    borderRadius:60,
    width:120,
    height:120,
  },
  characterName:{
    flex:1,
    textAlignVertical:'center',
    color:'#FF0000',
    fontSize:24,
    marginLeft:16,
  },
});

module.exports = CharacterView;