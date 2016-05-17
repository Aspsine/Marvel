import React, {Component} from 'React';
import {StyleSheet,Text} from 'react-native';

class LoadingLayout extends Component{

  constructor(props){
    super(props)
  }

  render(){
    if (this.props.status == STATUS_LOADING) {
      return this.props.renderLoading();
    }else if (this.props.status == STATUS_SUCCESS) {
      return this.props.renderContent();
    }else if (this.props.status == STATUS_EMPTY) {
      return this.props.renderEmpty();
    }else if (this.props.status == STATUS_ERROR) {
      return this.props.renderError();
    }else{
      return (<Text>Exception</Text>);
    }
  }
}

const STATUS_LOADING = 'loading', STATUS_SUCCESS = 'success', STATUS_EMPTY = 'empty', STATUS_ERROR = 'error';

const styles = StyleSheet.create({
  
});

module.exports = LoadingLayout;