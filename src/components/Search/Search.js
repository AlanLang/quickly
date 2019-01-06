import React, { Component } from 'react';
import classNames from 'classnames';
import './Search.scss';
export default class Search extends Component {
  render() {
    const {timeout} = this.props;
    return (
      <div className='search-container'>
        <div className='mainbar'>
          微信(应用)
        </div>
        <div className={classNames('keycontainer',{'underline':!timeout})}>
          {this.props.keyword}
        </div>
      </div>
    );
  }
}
