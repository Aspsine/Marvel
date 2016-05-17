'use strict';
import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
  Text,
  ToolbarAndroid,
  ListView,
  RefreshControl,
  ProgressBarAndroid,
} from 'react-native';

import HeaderView from './HeaderView.js';
import CharacterSectionHeader from './CharacterSectionHeader.js';
import CharacterView from './CharacterView.js';
import LoadingLayout from '../../widget/LoadingLayout.js'

var REQUEST_URL = 'https://raw.githubusercontent.com/Aspsine/SwipeToLoadLayout/master/app/src/main/assets/characters.json';
var VIEW_PAGER_BG_URL = 'https://raw.githubusercontent.com/Aspsine/SwipeToLoadLayout/master/app/src/main/res/mipmap-xxhdpi/bg_viewpager.jpg';

const STATUS_LOADING = 'loading', STATUS_SUCCESS = 'success', STATUS_ERROR = 'error';

class FeedScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: STATUS_LOADING,
      refreshing: false,
      dataSource:{
        headerDataSource: [],
        listDataSource: new ListView.DataSource({
          getSectionHeaderData: (sections, sectionID) => {return sections[sectionID];},
          getRowData: (sections, sectionID, rowID) => { return sections[sectionID].characters[rowID];},
          sectionHeaderHasChanged:(section1, section2) => section1 !== section2,
          rowHasChanged:(row1, row2) => row1 !== row2
        })
      },
    };

    this.renderLoading = this.renderLoading.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderListView = this.renderListView.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.renderRow = this.renderRow.bind(this);

    this.fetchData = this.fetchData.bind(this);
    this.retryFetchData = this.retryFetchData.bind(this);

    this.onActionSelected = this.onActionSelected.bind(this);
    this.onHeaderCharacterItemClick = this.onHeaderCharacterItemClick.bind(this);

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        var headerDataSource = responseData.characters,
            sections = responseData.sections,
            sectionIDs = [],
            rowIDs = [];

        for (var i = 0; i < sections.length; i++) {
          
          sectionIDs.push(i);

          var characters = sections[i].characters;

          var charactersLength = characters.length;

          rowIDs[i] = [];

          for (var j = 0; j < charactersLength; j++) {

            rowIDs[i].push(j);

          }
        }

        this.setState({
          dataSource: {
            headerDataSource:headerDataSource,
            listDataSource:this.state.dataSource.listDataSource.cloneWithRowsAndSections(sections, sectionIDs, rowIDs),
          },
          status: STATUS_SUCCESS,
          refreshing:false,
        });
      })
      .catch((error) => {
          this.setState({
            status: STATUS_ERROR,
          });
      });
  }

  retryFetchData(){
    this.setState({
      status:STATUS_LOADING,
    });
    this.fetchData();
  }

  onRefresh(){
    this.setState({
      refreshing:true,
    });
    this.fetchData();
  }

  onActionSelected(position){
    this.props.navigator.push({name:'about'});
  }

  onCharactorItemClicked(character, sectionID, rowID){
    ToastAndroid.show(character.name, ToastAndroid.SHORT);
    this.props.navigator.push({name:'detail', character:character,});
  }

  onHeaderCharacterItemClick(character, position){
    ToastAndroid.show(character.name, ToastAndroid.SHORT);
    // this.props.navigator.push({name:'detail', character:character,});
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ProgressBarAndroid 
          styleAttr='Inverse' 
          color='red'
          style={styles.progressBar}/>
      </View>
    );
  }

  renderError(){
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Network error!</Text>
        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple('#ff8888', false)}
          onPress={this.retryFetchData}>
          <View>
            <Text style={styles.errorButton}>TRY AGAIN</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  renderHeader(){
    return (
      <HeaderView
        backgroundUrl={VIEW_PAGER_BG_URL}
        characters={this.state.dataSource.headerDataSource}
        currentSelectedPage={0}
        onItemClick={(this.onHeaderCharacterItemClick)}/>
    );
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <CharacterSectionHeader section={sectionData}/>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#ff8888', false)}
        onPress={() => this.onCharactorItemClicked(rowData, sectionID, rowID)}>
        <View>
          <CharacterView
            character={rowData}/>
        </View>
      </TouchableNativeFeedback>
    );
  }

  renderRefreshControl(){
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        colors={['red']}
        onRefresh={this.onRefresh}/>
    );
  }

  renderListView(){
    return (
      <ListView
        removeClippedSubviews={false}
        dataSource={this.state.dataSource.listDataSource}
        renderHeader={this.renderHeader}
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderRow}
        refreshControl={this.renderRefreshControl()}
        style={styles.listView}
      />
    );
  }

  render() {
    return (
      <View style={styles.root}>
        <ToolbarAndroid 
          style={styles.toobar}
          titleColor='white'
          title='MARVEL'
          actions={[{title:'About', show:'always'}]}
          onActionSelected={this.onActionSelected}/>
          <LoadingLayout
            status={this.state.status}
            renderContent={this.renderListView}
            renderLoading={this.renderLoading}
            renderError={this.renderError} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    flexDirection:'column',
  },
  toobar:{
    height:56,
    backgroundColor:'#ff0000',
  },
  errorContainer:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  errorMessage:{
    fontSize:18,
  },
  errorButton:{
    marginTop:16,
    fontSize: 16,
    color:'#ff0000',
    fontWeight:'bold',
  },
  loadingContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#000000',
  },
  progressBar:{
    
  },
  listView:{
    flex:1,
  },
});

module.exports = FeedScene;