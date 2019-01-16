import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import SearchInput from './SearchInput'
import ConfigPage from './ConfigPage'
import SearchList from './SearchList'
import { pathService, openService, configService } from '../service'
const electron = window.require("electron");
const { ipcRenderer, remote,screen } = electron;

Mousetrap.bind('esc', function() { 
  const window = remote.getCurrentWindow();
  window.minimize();
}, 'keyup');

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfig:false,
      showResule:false,
      canInput:true,
      selectIndex:0,
      searchResult:[]
    };
  }

  componentWillMount(){
    configService.get("showList").then(re=>{
      if(re){
        if(re.value === '0'){
          ipcRenderer.send('asynchronous-config', 'hideList')
          this.setWindowsHeight(0);
          this.setState({
            showResule:false
          })
        }else{
          ipcRenderer.send('asynchronous-config', 'showList')
          this.setWindowsHeight(this.state.searchResult.length);
          this.setState({
            showResule:true
          })
        }
      }
      
    })
  }

  componentDidMount(){
    ipcRenderer.on('main-process-href', (event, arg) => {
      if(arg === 'config'){
        this.setState({
          showConfig:true,
          canInput:false
        })
        const window = remote.getCurrentWindow();
        window.setMinimumSize(600,500);
        window.setSize(600,500);
        window.center();
        window.show();
      }
      if(arg === 'home'){
        this.setState({
          showConfig:false,
          canInput:true
        })
        this.setWindowsHeight(0);
      }
    });

    ipcRenderer.on('main-process-message', (event, arg) => {
      if(arg === 'showOrHideList'){
        const code = this.state.showResule?"1":"0";
        configService.set("showList",code).then(re=>{
          this.setState({
            showResule:!this.state.showResule,
            selectIndex:0
          })
        })
      }
    })
  }
  
  onEnter=(keyWord)=>{
    const {searchResult,selectIndex} = this.state;
    const nofind  = searchResult.length == 0;
    if(nofind){

    }else{
      openService.open(searchResult[selectIndex]);
      const window = remote.getCurrentWindow();
      window.hide();
    }
  }
  onChange=(keyWord)=>{
    pathService.find(keyWord).then(re=>{
      this.setState({
        searchResult:re,
        selectIndex:0
      })
      if(this.state.showResule){
        this.setWindowsHeight(re.length);
      }
    })
  }
  onListChange=(index) => {
    this.setState({
      selectIndex:index
    })
  }
  setWindowsHeight = (num) => {
    const window = remote.getCurrentWindow();
    const { width } = screen.getPrimaryDisplay().workAreaSize
    const height = num>0?num*45+65:55;
    window.setMinimumSize(600,height);
    window.setSize(600,height);
    window.setPosition((width-600)/2,250);
  }

  render() {
    const {showConfig, searchResult, canInput, selectIndex, showResule} = this.state;
    return (
      <div style={{height:'100vh',overflow:'hidden'}}>
        <SearchInput select={selectIndex} enable={canInput} data={searchResult} onEnter={this.onEnter} onChange={this.onChange} ></SearchInput>
        {showConfig?<ConfigPage ></ConfigPage>:null}
        {searchResult.length>0 && showResule?<SearchList data={searchResult} onChange={this.onListChange} selectIndex={selectIndex}></SearchList>:null}
      </div>
    );
  }
}

export default HomePage;
