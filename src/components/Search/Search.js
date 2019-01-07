import React, { Component } from 'react';
import classNames from 'classnames';
import './Search.scss';
export default class Search extends Component {
  render() {
    const {timeout,data} = this.props;
    let result = ''
    if(data.length > 0){
      result = data[0].title;
    }
    return (
      <div className='search-container'>
        <div className='mainbar'>
          {result}
        </div>
        <div className={classNames('keycontainer',{'underline':!timeout})}>
          {this.props.keyword}
        </div>
      </div>
    );
  }
}
