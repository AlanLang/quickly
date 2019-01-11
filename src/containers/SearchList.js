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
    const that = this;
    Mousetrap.bind('up', function() {
      if(that.state.selectIndex > 0){
        const selectIndex = that.state.selectIndex - 1;
        that.setState({
          selectIndex:selectIndex
        })
        if(that.props.onChange)
        that.props.onChange(selectIndex)
      }
    });
    Mousetrap.bind('down', function() {
      if(that.state.selectIndex < that.props.data.length - 1){
        const selectIndex = that.state.selectIndex + 1;
        that.setState({
          selectIndex:selectIndex
        })
        if(that.props.onChange)
        that.props.onChange(selectIndex)
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