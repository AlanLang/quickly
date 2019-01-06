import React, { Component } from 'react';
import styles from './Search.css';
export default class Search extends Component {
  render() {
    const underline = this.props.timeout?null:{textDecoration:'underline'}
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.mainbar}>
        
        </div>
        <div className={styles.keycontainer} style={underline}>
          {this.props.keyword}
        </div>
      </div>
    );
  }
}
