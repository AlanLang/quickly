import React, { Component } from 'react';
import SelectResult from '../components/SelectResult/SelectResult'
import Mousetrap from 'mousetrap';

export default class SearchList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const that = this;
    Mousetrap.bind('up', function() {
      if(that.props.selectIndex > 0){
        const selectIndex = that.props.selectIndex - 1;
        if(that.props.onChange)
          that.props.onChange(selectIndex)
      }
    });
    Mousetrap.bind('down', function() {
      if(that.props.selectIndex < that.props.data.length - 1){
        const selectIndex = that.props.selectIndex + 1;
        if(that.props.onChange)
          that.props.onChange(selectIndex)
      }
    });
  }

  render() {
    const {selectIndex} = this.props;
    return (
      <SelectResult data={this.props.data} selectIndex={selectIndex}>
      </SelectResult>
    );
  }
}