import React, {Component, Platform} from 'react';
import {StyleSheet, View, ToolbarAndroid, Text, Linking} from 'react-native';

class AboutScene extends Component{
  constructor(props){
    super(props);
    this.linkToGithubRepo = this.linkToGithubRepo.bind(this);
    this.linkToGithub = this.linkToGithub.bind(this);
    this.onBackPressed = this.onBackPressed.bind(this);
  }

  linkToGithub(){
    Linking.openURL("http://www.github.com/Aspsine");
  }

  linkToGithubRepo(){
    Linking.openURL("http://www.github.com/Aspsine/ReactMarvel");
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
          style={styles.toobar}
          title='ABOUT'/>
        <View style={styles.container}>
          <Text style={styles.titleText}>Marvel</Text>
          <Text style={styles.versionText}>V 0.0.1</Text>
          <Text style={styles.authorName} onPress={this.linkToGithub}>Aspsine</Text>
          <Text style={styles.descText}>Marvel is a react-native demo app.</Text>
          <Text style={styles.authorGithub} onPress={this.linkToGithubRepo}>http://www.github.com/Aspsine/ReactMarvel</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'white',
  },
  toobar:{
    height:56,
    backgroundColor:'#ff0000',
  },
  container:{
    flex:1,
    flexDirection:'column',
    alignItems:'center'
  },
  titleText:{
    marginTop:24,
    fontSize: 24,
  },
  versionText:{
    marginTop:18,
  },
  authorName:{
    marginTop:16,
    color:'#ff0000',
  },
  descText:{
    fontSize: 16,
    marginTop: 16,
  },
  authorGithub:{
    marginTop:16,
    color:'#ff0000',
  },
});

module.exports = AboutScene;