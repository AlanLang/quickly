import React, { Component } from 'react';
import { Row, Col,Icon, Input, message } from 'antd';
import {pathService} from '../../service'
import './Table.scss';
const iconStyle = {
  marginLeft:'12px',
  cursor:'pointer'
}

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding:false,
      isEditing: false,
      code:'',
      title:'',
      value:'',
      id:''
    };
  }
  onAdd = () => {
    this.setState({
      isAdding:true
    })
  }

  onAddCommit = () => {
    const {code, title, value, isEditing, id} = this.state;
    if(!code){
      message.warning('请输入指令');
      return;
    }
    if(!title){
      message.warning('请输入标题');
      return;
    }
    if(!value){
      message.warning('请输入地址');
      return;
    }
    if(isEditing){
      pathService.update({id,code, title, value })
      .then(re=>{
        if(this.props.onChange){
          this.props.onChange(re);
          this.onAddCancel();
        }
      })
    }else{
      pathService.hasNoOne(code).then(re=>{
        return pathService.insert({code, title, value })
        .then(re=>{
          if(this.props.onChange){
            this.props.onChange(re);
            this.onAddCancel();
          }
        })
      },err =>{
        message.error('存在相同的指令，请修改！');
      })
    }

  }

  onAddCancel = () => {
    this.setState({
      isAdding:false,
      isEditing:false,
      code:'',
      title:'',
      value:'',
      id:''
    })
  }

  onDelete = (id,event) => {
    pathService.remove(id).then(re=>{
      if(this.props.onChange){
        this.props.onChange(re);
      }
    })
  }

  onEdit = (item,event) => {
    console.log('%citem: ','color: MidnightBlue; background: Aquamarine;',item);
    this.setState({
      isEditing:true,
      code:item.code,
      title:item.title,
      value:item.value,
      id:item._id
    })
  }

  render() {
    const {data} = this.props;
    const {isAdding, isEditing} = this.state;
    const items = [];
    data.forEach(item => {
      items.push(<Row key={item._id} gutter={12}>
        <Col className="gutter-row" span={4}>{item.code}</Col>
        <Col className="gutter-row" span={4}>{item.title}</Col>
        <Col className="gutter-row" span={13}>{item.value}</Col>
        <Col className="gutter-row" span={3}>
          <Icon style={iconStyle} onClick={this.onEdit.bind(this,item)} type="edit" />
          <Icon type="delete" onClick={this.onDelete.bind(this,item._id)} style={iconStyle} />
        </Col>
      </Row>)
    });
    if(isAdding || isEditing){
      items.push(<Row key='adding' gutter={12}>
        <Col span={4}>
          <Input  placeholder="指令" value={this.state.code} onChange={e => this.setState({ code: e.target.value })}/>
        </Col>
        <Col  span={4}>
          <Input placeholder="标题" value={this.state.title} onChange={e => this.setState({ title: e.target.value })}/>
        </Col>
        <Col  span={13}>
          <Input placeholder="地址(网页以http或https开头)" 
          value={this.state.value} 
          onChange={e => this.setState({ value: e.target.value })}/>
        </Col>
        <Col  span={3}>
          <Icon type="check" onClick={this.onAddCommit} style={iconStyle} />
          <Icon type="close" onClick={this.onAddCancel} style={iconStyle} />
        </Col>
    </Row>)
    }else{
      items.push(<Row key='add'>
      <Col className="gutter-add" onClick={this.onAdd} span={24}><Icon style={{marginRight:'6px'}} type="plus" />添加</Col>
    </Row>)
    }
    return items;
  }
}
