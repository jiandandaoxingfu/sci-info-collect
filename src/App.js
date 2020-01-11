// Thanks to 
//      https://www.iconfont.cn/search/index
//      https://c.runoob.com/more/svgeditor
//      https://ant.design/components/

import React from 'react';
import './App.css';
import styles from './styles.js';

import { Button, Layout, Input, Tooltip } from 'antd';

const electron = window.electron;
const { Header, Content, Footer } = Layout;
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;
          
function send_title() {
	let title = document.getElementById('title').value;
	if( !title ) return;
	electron.ipcRenderer.send('search_title_2_main', {
  		title: title
	});
}

function show_subWindow() {
    electron.ipcRenderer.send('show_subWindow', true);
}

electron.ipcRenderer.on('search_title_from_main', (event, message) => {
	console.log(message);
});

export default () => { 
    return (
        <Layout style = { styles.layout }>
            <Header style = { styles.header }>
            	<Input placeholder="输入文章标题" style = { styles.input } id='title'/>
            	<Button type='primary' style={ styles.button } onClick={ send_title } >开始统计</Button>
            	<Button type='primary' style={ styles.button } onClick={ show_subWindow } >显示后台</Button>
            	<Button type='primary' style={ styles.button }>返回主页</Button>
            </Header>
			<Content> 
            </Content>
            <Footer style = { styles.footer }>
            		©2020 Created by JMx. <a href='https://github.com/jiandandaoxingfu'>github</a><br />
            </Footer>
        </Layout>
    );
}

const url = 'http://apps.webofknowledge.com/WOS_GeneralSearch_input.do?product=WOS&SID=7DBXuf8BGjDHjAXvhAb&search_mode=GeneralSearch';

// function open_url() {
// 	let title = document.getElementById('search_input').value;
// 	if( !title ) return;
// 	var iframe = document.getElementById("iframe");
// 	iframe.src = url;
	 
// 	if (iframe.attachEvent){
//     	iframe.attachEvent("onload", function(){
//         	frame.contentWindow.postMessage(object, 'message');
//     	});
// 	} else {
//     	iframe.onload = function(){
//         	frame.contentWindow.postMessage(object, 'message');
//     	};
// 	}
// }

// function searchdo(title) {
// 	var doc = document.getElementById("iframe").contentWindow.document;
// 	doc.getElementById('value(input1)').value= title;
// 	doc.getElementById('select2-select1-container').innerHTML='标题'; 
// 	doc.getElementById('searchCell1').firstElementChild.firstElementChild.click();
// }

