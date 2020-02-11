// Thanks to 
//      https://www.iconfont.cn/search/index
//      https://c.runoob.com/more/svgeditor
//      https://ant.design/components/

import React from 'react';
import './App.css';
import styles from './styles.js';
import { Button, Layout, Input, InputNumber, Tooltip  } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
    render() {
        return (
            <Layout style = { styles.layout }>
                <Header style = { styles.header }>
            	    <Input placeholder="输入文章标题，多篇以逗号隔开" style = { styles.input_title } id='title'/>
                    <Input placeholder="筛选年份" style = { styles.input_year } id='year'/>
                    <Input placeholder="作者姓名：如 Chen-Jing-Run" style = { styles.input_author } id='author'/>
                    <span style = { {fontSize: '15px', color: 'rgba(0, 0, 0, 0.3)'} }>最大下载数： </span>
                    <Tooltip title="最大下载数越大，打开的窗口越多，因此需要视计算机性能而定(1～10)。">
                        <InputNumber min={1} max={10} defaultValue={3} id="threads"/>
                    </Tooltip>
            	    <Button type='primary' style={ styles.button } >开始统计</Button>
            	    <Button type='primary' style={ styles.button } >重新启动</Button>
                </Header>
			    <Content> 
                    <div id="container" style = { styles.container }></div>
                </Content>
                <Footer style = { styles.footer }>
            		©2020 Created by JMx. <a href="https://github.com/jiandandaoxingfu/sci-info-collect/blob/master/README.md">帮助</a><br />
                </Footer>
            </Layout>
        );
    }
}

export default App;