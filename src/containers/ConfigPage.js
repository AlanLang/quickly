import React, { Component } from 'react';
import Config from '../components/Config/Config'
import { pathService } from '../service'

export default class ConfigPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet:[]
    };
  }
  componentWillMount(){
    pathService.findAll().then(re=>{
      this.setState({
        dataSet:re
      })
    })
  }
  render() {
    return <Config data={this.state.dataSet}></Config>
  }
}
