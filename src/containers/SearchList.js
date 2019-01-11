import React, { Component } from 'react';
import SelectResult from '../components/SelectResult/SelectResult'
import Mousetrap from 'mousetrap';

export default class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectIndex:0
    };
  }

  componentDidMount(){
    Mousetrap.bind('up', function() {
      if(this.state.selectIndex > 0){
        this.setState({
          selectIndex:this.state.selectIndex - 1
        })
      }
    });
    Mousetrap.bind('down', function() {
      if(this.state.selectIndex < this.props.data.length - 1){
        this.setState({
          selectIndex:this.state.selectIndex + 1
        })
      }
    });
  }

  render() {
    const {selectIndex} = this.state;
    return (
      <SelectResult data={this.props.data} selectIndex={selectIndex}>
      </SelectResult>
    );
  }
}