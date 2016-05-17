/**
 * @Aspsine
 * https://github.com/Aspsine/ReactMarvel
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  BackAndroid,
  View,
  Text,
  Navigator
} from 'react-native';

import SplashScene from './react_native/src/main/js/scene/SplashScene.js';
import FeedScene from './react_native/src/main/js/scene/feed/FeedScene.js';
import AboutScene from './react_native/src/main/js/scene/AboutScene.js';
import DetailScene from './react_native/src/main/js/scene/DetailScene.js';


class Marvel extends Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, navigator) {
    this.navigator = navigator;
    if (route.name == 'splash') {
      return (<SplashScene  navigator={navigator} />);
    }else if(route.name == 'feed'){
      return (<FeedScene  navigator={navigator} />);
    }else if(route.name == 'about'){
      return (<AboutScene navigator={navigator} />);
    }else if (route.name == 'detail') {
      return (<DetailScene navigator={navigator} character={route.character}/>);
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
  }

  ComponentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack() {
    if (this.navigator && this.navigator.getCurrentRoutes().length > 1 ) {
      this.navigator.pop();
      return true;
    }
    return false;
  }

  render() {
    var initialRoute = {name:'splash'}
    return (
      <Navigator
        style={styles.navigator}
        initialRoute={initialRoute}
        configureScence={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
        renderScene={this.renderScene}
      />
    )
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

AppRegistry.registerComponent('Marvel', () => Marvel);
