import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import SearchInput from './SearchInput'
import ConfigPage from './ConfigPage'
import SearchList from './SearchList'
import { pathService } from '../service'
import { openService} from '../service'
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
      canInput:true,
      selectIndex:0,
      searchResult:[]
    };
  }

  componentDidMount(){
    ipcRenderer.on('main-process-href', (event, arg) => {
      if(arg === 'config'){
        this.setState({
          showConfig:true,
          canInput:false
        })
      }
      if(arg === 'home'){
        this.setState({
          showConfig:false,
          canInput:true,
        })
        this.setWindowsHeight(this.state.searchResult.length);
      }
    });
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
        searchResult:re
      })
      this.setWindowsHeight(re.length);
    })
    //console.log(keyWord)
  }
  onListChange=(index) => {
    this.setState({
      selectIndex:index
    })
  }
  setWindowsHeight = (num) => {
    const window = remote.getCurrentWindow();
    const { width } = screen.getPrimaryDisplay().workAreaSize
    const height = num>1?(num+1)*50:55;
    window.setMinimumSize(600,height);
    window.setSize(600,height);
    window.setPosition((width-600)/2,250);
  }

  render() {
    const {showConfig, searchResult, canInput, selectIndex} = this.state;
    return (
      <div style={{height:'100vh',overflow:'hidden'}}>
        <SearchInput select={selectIndex} enable={canInput} data={searchResult} onEnter={this.onEnter} onChange={this.onChange} ></SearchInput>
        {showConfig?<ConfigPage ></ConfigPage>:null}
        {searchResult.length>1?<SearchList data={searchResult} onChange={this.onListChange}></SearchList>:null}
      </div>
    );
  }
}

export default HomePage;
