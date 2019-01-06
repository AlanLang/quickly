import React, { Component } from 'react';
import SearchInput from './SearchInput'
const electron = window.require("electron");
const { ipcRenderer } = electron;

class HomePage extends Component {
  componentDidMount(){
    ipcRenderer.on('main-process-href', (event, arg) => {
      console.log('%carg: ','color: MidnightBlue; background: Aquamarine;',arg);
    });
  }
  onBack=()=>{
    ipcRenderer.send('asynchronous-message', 'home')
  }
  render() {
    return (
      <div style={{height:'100vh'}}>
        <SearchInput></SearchInput>
        <button onClick={this.onBack}>返回</button>
      </div>
    );
  }
}

export default HomePage;
