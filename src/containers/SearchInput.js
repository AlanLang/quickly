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
      if(!that.props.enable){
        return;
      }
      if(e.key == 'Enter'){
        if(that.props.onEnter){
          that.props.onEnter(that.state.keyword);
        }
        that.setState({
          timeout:true
        })
        return;
      }
      if(that.state.timeout){
        code = '';
      }
      code += e.key;
      that.setState({
        keyword:code,
        timeout:false
      })
      nowTime = new Date().getTime();
      if(that.props.onChange){
        that.props.onChange(that.state.keyword);
      }
    })
    this.timer = setInterval(() => {
      const minTimes = new Date().getTime() - nowTime;
      if(minTimes > 1000 && !that.state.timeout){
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
    const {data} = this.props;
    return <Search data={data} keyword={keyword} timeout={timeout}></Search>;
  }
}

export default SearchInput;