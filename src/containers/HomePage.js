import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import SearchInput from './SearchInput'
import ConfigPage from './ConfigPage'
import { pathService } from '../service'
import { openService} from '../service'
const electron = window.require("electron");
const { ipcRenderer, remote } = electron;

Mousetrap.bind('esc', function() { 
  const window = remote.getCurrentWindow();
  window.hide();
}, 'keyup');

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfig:false,
      searchResult:[]
    };
  }

  componentDidMount(){
    ipcRenderer.on('main-process-href', (event, arg) => {
      if(arg === 'config'){
        this.setState({
          showConfig:true
        })
      }
      if(arg === 'home'){
        this.setState({
          showConfig:false
        })
      }
    });
  }
  
  onEnter=(keyWord)=>{
    const {searchResult} = this.state;
    const nofind  = searchResult.length == 0;
    if(nofind){

    }else{
      openService.open(searchResult[0]);
      const window = remote.getCurrentWindow();
      window.hide();
    }
  }
  onChange=(keyWord)=>{
    pathService.find(keyWord).then(re=>{
      this.setState({
        searchResult:re
      })
    })
    //console.log(keyWord)
  }
  render() {
    const {showConfig, searchResult} = this.state;
    return (
      <div style={{height:'100vh',overflow:'hidden'}}>
        <SearchInput data={searchResult} onEnter={this.onEnter} onChange={this.onChange} ></SearchInput>
        {showConfig?<ConfigPage ></ConfigPage>:null}
      </div>
    );
  }
}

export default HomePage;
