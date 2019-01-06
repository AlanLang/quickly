import React, { Component } from 'react';
import Search from '../components/Search/Search'
class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword:'',
      timeout:true
    };
  }

  componentDidMount() {
    let code = "";
    const that = this;
    let nowTime = new Date().getTime();
    window.addEventListener('keypress',function(e){
      if(that.state.timeout){
        code = '';
      }
      code += e.key;
      that.setState({
        keyword:code,
        timeout:false
      })
      nowTime = new Date().getTime();
    })
    this.timer = setInterval(() => {
      if(new Date().getTime() - nowTime > 1000 && !that.state.timeout){
        that.setState({
          timeout:true
        })
      }
    }, 500)
  }

  componentWillUnmount() {
    if(this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const {keyword,timeout} = this.state;
    return <Search keyword={keyword} timeout={timeout}></Search>;
  }
}

export default SearchInput;