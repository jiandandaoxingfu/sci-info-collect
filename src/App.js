// Thanks to 
//      https://www.iconfont.cn/search/index
//      https://c.runoob.com/more/svgeditor
//      https://ant.design/components/

import React from 'react';
import './App.css';
import styles from './styles.js';
import table from './table.js'
import { Button, Layout, Input, Tooltip, Table, Divider } from 'antd';

const electron = window.electron;
const { Header, Content, Footer } = Layout;
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: text => <div style={ styles.title } title={ text }>{ text }</div>,
  },
  {
    title: '搜索结果',
    dataIndex: 'mutil',
    key: 'mutil',
  },
  {
    title: '总引用量',
    dataIndex: 'cite_num',
    key: 'cite_num',
  },
  {
    title: '2018引用量',
    dataIndex: 'cite_num_2018',
    key: 'cite_num_2018',
  },
  {
    title: '2018引用文献列表',
    dataIndex: 'cite_page_pirnted',
    key: 'cite_page_pirnted',
  },
  {
    title: '详情页',
    dataIndex: 'detail_page_printed',
    key: 'detail_page_printed',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Delete</a>
      </span>
    ),
  },
];

class App extends React.Component {
    state = {
        data: [],
        current_id: 0,
        title_arr: [],
    }

    send_title = () => {
        this.setState({ data: [] });
        this.message_handle();
        let title_arr = document.getElementById('title').value.replace(/，/g, ',').split(',');
        this.setState( { title_arr: title_arr }, () => {
            this.change_data();
        });
        if( title_arr.length === 0 ) return;
        electron.ipcRenderer.send('search_title_2_main', {
            title: title_arr[0]
        });
    }
    
    show_subWindow = () => {
        electron.ipcRenderer.send('show_subWindow', true);
    }
    
    restart = () =>  {
        electron.ipcRenderer.send('restart', true);
    }
    
    change_data = () => {
        let data_ = [...this.state.data];
        this.state.title_arr.map( (title, id) => {
            data_.push({
                key: id + 1, 
                title: title, 
                mutil: '',
                cite_num: '',
                cite_num_2018: '',
                cite_page_pirnted: '',
                detail_page_printed: '',
            })  
        })
        this.setState({
            data: data_
        })
    }

    message_handle = () => {
        electron.ipcRenderer.on('status', (event, message) => {
            let title_arr = this.state.title_arr;
            message = JSON.parse(message);
            if( message.msg.includes('no_') || message.msg === 'mutil' || message.msg === 'detail_page_printed' ) {
                let data = [...this.state.data];
                if( message.msg === 'mutil' ) {
                    data[this.state.current_id].mutil = '搜索结果不唯一';
                } else if( message.msg === 'no_cite' ) {
                    data[this.state.current_id].cite_num = 0;
                } else if( message.msg === 'no_2018_cite' ) {
                    data[this.state.current_id].cite_num_2018 = 0;
                } else if( message.msg === 'cite_num' ) {
                    data[this.state.current_id].cite_num = message.data;
                } else if( message.msg === 'cite_num_2018' ) {
                    data[this.state.current_id].cite_num_2018 = message.data;
                } else if( message.msg === 'cite_page_pirnted' ) {
                    data[this.state.current_id].cite_page_pirnted = '已打印';
                } else if( message.msg === 'detail_page_printed' ) {
                    data[this.state.current_id].detail_page_printed = '已打印';
                }
                this.setState({ current_id: this.state.current_id + 1, data: data }, () => {
                    if( title_arr.length === this.state.current_id ) {
                        alert('done');
                    } else {
                        electron.ipcRenderer.send('search_title_2_main', {
                            title: title_arr[this.state.current_id]
                        });
                    }
                });
            }
        })
    }

    render() {
        return (
            <Layout style = { styles.layout }>
                <Header style = { styles.header }>
            	   <Input placeholder="输入文章标题" style = { styles.input } id='title'/>
            	   <Button type='primary' style={ styles.button } onClick={ this.send_title } >开始统计</Button>
            	   <Button type='primary' style={ styles.button } onClick={ this.show_subWindow } >显示后台</Button>
            	   <Button type='primary' style={ styles.button } onClick={ this.restart }>重新启动</Button>
                </Header>
			     <Content> 
                    <Table columns={columns} dataSource={ this.state.data } style={ styles.table } pagination={ false }/>
                </Content>
                <Footer style = { styles.footer }>
            		  ©2020 Created by JMx. <a href='https://github.com/jiandandaoxingfu'>github</a><br />
                </Footer>

            </Layout>
        );
    }
}

export default App;