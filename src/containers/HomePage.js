import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import SearchInput from './SearchInput'
import ConfigPage from './ConfigPage'
import { pathService } from '../service'
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
    };
  }

  componentDidMount(){
    pathService.find('谷歌').then(re=>{
      console.log('%cre: ','color: MidnightBlue; background: Aquamarine;',re);
    })
    ipcRenderer.on('main-process-href', (event, arg) => {
      console.log('%carg: ','color: MidnightBlue; background: Aquamarine;',arg);
    });
  }
  // onBack=()=>{
  //   console.log(123)
  //   ipcRenderer.send('asynchronous-message', 'home')
  // }
  onEnter=(keyWord)=>{
    const nofind  = true;
    if(nofind){
      this.setState({
        nofind:true
      })
    }else{
      const window = remote.getCurrentWindow();
      window.hide();
    }
  }
  onChange=(keyWord)=>{
    //console.log(keyWord)
  }
  render() {
    return (
      <div style={{height:'100vh',overflow:'hidden'}}>
        <SearchInput onEnter={this.onEnter} onChange={this.onChange} ></SearchInput>
        <ConfigPage></ConfigPage>
      </div>
    );
  }
}

export default HomePage;
