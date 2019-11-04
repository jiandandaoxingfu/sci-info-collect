import React from 'react';
import './App.css';

import { Skeleton, List, Avatar, Button, Layout, Divider, Input, Col, Row, Card, Descriptions } from 'antd';
const { Header, Content, Footer } = Layout;
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;

const styles = {
    header: {
        color: 'white',
        fontSize: '25px',
        textAlign: 'center'
    },

    content: {
        minHeight: '400px',
        backgroundColor: 'white',
        overflowY: 'scroll'
    },

    footer: {
        height:  '50px',
        padding: '15px 0',
        textAlign: 'center'
    }
};

export default () => { 
    return (
        <Layout>
            <Header style={ styles.header }>
            	音乐播放器
            </Header>
            <Content style={ styles.content }>
                <List> 
                    <List.Item action={ [<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>] }>
                        <List.Item.Meta
                            title='一个人'
                        />
                        <div>content</div>
                    </List.Item>
                </List>
            </Content>
         	<Footer style={ styles.footer }>
				Music ©2019 Created by JMx<br />
         	</Footer>
        </Layout>
    );
}
