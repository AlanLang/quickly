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

  onChange = (data) => {
    this.findAll();
  }

  findAll = () => {
    pathService.findAll().then(re=>{
      this.setState({
        dataSet:re
      })
    })
  }

  componentWillMount(){
    this.findAll();
  }
  render() {
    return <Config data={this.state.dataSet} onChange={this.onChange}></Config>
  }
}
