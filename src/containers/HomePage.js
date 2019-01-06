import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import SearchInput from './SearchInput'
import { paths } from '../modules'
const electron = window.require("electron");
const { ipcRenderer, remote } = electron;

Mousetrap.bind('esc', function() { 
  const window = remote.getCurrentWindow();
  window.hide();
}, 'keyup');

class HomePage extends Component {
  componentDidMount(){
    paths.find('谷歌').then(re=>{
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
    const window = remote.getCurrentWindow();
    window.hide();
    console.log(keyWord)
  }
  onChange=(keyWord)=>{
    //console.log(keyWord)
  }
  render() {
    return (
      <div style={{height:'100vh',overflow:'hidden'}}>
        <SearchInput onEnter={this.onEnter} onChange={this.onChange}></SearchInput>
      </div>
    );
  }
}

export default HomePage;
