// Thanks to 
//      https://www.iconfont.cn/search/index
//      https://c.runoob.com/more/svgeditor
//      https://ant.design/components/

import React from 'react';
import './App.css';
import styles from './styles.js';
import { Button, Layout, Input, Table } from 'antd';

const electron = window.electron;
const { Header, Content, Footer } = Layout;

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: text => <span title={ text }>{ text.slice(0, 30) + '...' }</span>,
  },
  {
    title: '搜索结果',
    dataIndex: 'search_result',
    key: 'search_result',
  },
  {
    title: '总引用量',
    dataIndex: 'cite_num',
    key: 'cite_num',
  },
  {
    title: '2018引用量',
    dataIndex: 'cite_year_num',
    key: 'cite_year_num',
  },
  {
    title: '自引',
    dataIndex: 'self_cite_num',
    key: 'self_cite_num',
  },
  {
    title: '他引',
    dataIndex: 'other_cite_num',
    key: 'other_cite_num',
  },
  {
    title: '2018引用文献列表',
    dataIndex: 'cite_page_printed',
    key: 'cite_page_printed',
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
        let author = document.getElementById('author').value;
        let year = document.getElementById('year').value.replace(/，/g, ',').replace(/\s/g, '').split(',');
        if( title_arr[0] === "" || author === '' || year[0] === "") {
            alert('请输入标题， 年份， 作者');
            return;
        }
        this.setState( { title_arr: title_arr }, () => {
            this.change_data();
        });
        electron.ipcRenderer.send('search_title_2_main', title_arr[0]);
        electron.ipcRenderer.send('selection', {
            author: author,
            year: year,
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
                search_result: '',
                cite_num: '',
                cite_year_num: '',
                cite_page_printed: '',
                detail_page_printed: '',
            })  
        })
        this.setState({
            data: data_
        })
    }

    update_and_load = (data, message) => {
        this.setState({ data: data }, () => {
            let title_arr = this.state.title_arr;
            if( title_arr.length - this.state.current_id === 1 ) {
                setTimeout(() => {
                    alert('统计完成');
                }, 200);
            } else if( !message.match(/\d/) ) {
                this.setState({ current_id: this.state.current_id + 1 }, () => {
                    electron.ipcRenderer.send('search_title_2_main', title_arr[this.state.current_id]);
                })                    
            }
        });
    }

    message_handle = () => {
        electron.ipcRenderer.on('search_page_status', (event, message) => {
            let data = [...this.state.data];
            if( message === 'mutil' ) {
                data[this.state.current_id].search_result = '不唯一';
            } else if( message === 'no_cite' ) {
                data[this.state.current_id].cite_num = 0;
            } else if( message === 'no_found' ) {
                data[this.state.current_id].search_result = '没有找到';
            } else {
                data[this.state.current_id].cite_num = message;
            }
            this.update_and_load(data, message);
        })

        electron.ipcRenderer.on('cite_page_status', (event, message) => {
            let data = [...this.state.data];
            if( message === 'no_2018_cite' ) {
                data[this.state.current_id].cite_year_num = '0';
            } else {
                data[this.state.current_id].cite_year_num = message;
            }
            this.update_and_load(data, message);
        })

        electron.ipcRenderer.on('cite_num', (event, message) => {
            let data = [...this.state.data];
            data[this.state.current_id].self_cite_num = message.self_cite_num;
            data[this.state.current_id].other_cite_num = message.other_cite_num;
            this.update_and_load(data, '1');
        })

        electron.ipcRenderer.on('print', (event, message) => {
            let data = [...this.state.data];
            if( message === 'cite_page_printed' ) {
                data[this.state.current_id].cite_page_printed = '已打印';
                this.update_and_load(data, '1');
            } else {
                data[this.state.current_id].detail_page_printed = '已打印';
                this.update_and_load(data, '');
            }
        })

    }

    render() {
        return (
            <Layout style = { styles.layout }>
                <Header style = { styles.header }>
            	    <Input placeholder="输入文章标题，多篇以逗号隔开" style = { styles.input_title } id='title'/>
                    <Input placeholder="统计年份" style = { styles.input_year } id='year'/>
                    <Input placeholder="作者姓名：如 Liu-Yi-Fei" style = { styles.input_author } id='author'/>
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