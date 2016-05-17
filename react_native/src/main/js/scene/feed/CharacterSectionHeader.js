import React, {Component,} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class CharacterSectionHeader extends Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.groupContainer}>
        <View style={styles.groupIndicator}/>
        <Text style={styles.groupTitle}>
          {this.props.section.name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  groupContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingTop:12,
    paddingBottom:12,
  },
  groupIndicator:{
    width:16,
    height:16,
    backgroundColor:'#FF0000',
  },
  groupTitle:{
    color:'#FF0000',
    flex:1,
    fontSize:24,
    marginLeft:8,
    fontWeight:'bold',
  },
});

module.exports = CharacterSectionHeader;
