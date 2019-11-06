// Thanks to 
//      https://www.iconfont.cn/search/index
//      https://c.runoob.com/more/svgeditor
//      https://ant.design/components/

import React from 'react';
import './App.css';
import Wheel from './Wheel.js';
import Canvas from './Canvas.js';
import Drag from './Drag.js';

import { Button, Layout, Input, Card } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;

// Mathjax
(function() {
  document.getElementsByTagName('head')[0].innerHTML += `
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            messageStyle: 'none',
            tex2jax: {inlineMath: [['$','$']], preview: 'none'},
            jax: ["input/TeX", "output/SVG"],
            TeX: { equationNumbers: { autoNumber: "AMS" }}
        });
    </script>
  `
  var script = document.createElement('script');
  script.setAttribute('type', "text/javascript");
  script.setAttribute('src', "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=default");
  document.getElementsByTagName('head')[0].appendChild(script);
})();


export default () => { 
    return (
        <Layout style={ styles.layout }>
            <Header className='header' style={ styles.header }>
                <Button ghost size='small' style={ styles.button } icon='delete'>清除</Button>
                &nbsp;&nbsp;
                <Button ghost size='small' style={ styles.button } icon='reload'>复位</Button>
                &nbsp;&nbsp;
                <Button ghost type='dashed' size='small' style={ styles.button } icon='import'>导出</Button>
                &nbsp;&nbsp;
                <Button ghost size='small' style={ styles.button } icon='bar-chart'>坐标轴</Button>
                &nbsp;&nbsp;
                <Button ghost type='dashed' size='small' style={ styles.button } icon='table'>网格</Button>
                &nbsp;&nbsp;
                
            </Header>

            <Content style={ styles.content }>
                <Layout style={ styles.subLayout }>
                    <Sider width="50px" style={ styles.leftSider }>
                        <div title="移动"><svg id="move" className='tools_active'     onClick={ highlight_border } viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M510.479501 952.54307c-12.498988 0-22.631978-10.13099-22.631977-22.631978V669.645346c0-12.497988 10.13299-22.631978 22.631977-22.631978 12.499988 0 22.631978 10.13399 22.631978 22.631978v260.265746c0 12.500988-10.13199 22.631978-22.631978 22.631978z" fill="#ffffff" p-id="12562"></path><path d="M506.519505 997.241026a22.557978 22.557978 0 0 1-16.001984-6.628993L370.001639 870.09915c-8.837991-8.837991-8.837991-23.168977 0-32.007968 8.838991-8.837991 23.167977-8.837991 32.006968 0l120.514883 120.514882c8.838991 8.838991 8.838991 23.168977 0 32.006969a22.557978 22.557978 0 0 1-16.003985 6.627993z" fill="#ffffff" p-id="12563"></path><path d="M516.138496 997.241026a22.553978 22.553978 0 0 1-16.001984-6.628993c-8.839991-8.837991-8.839991-23.167977 0-32.006969L620.649394 838.091182c8.837991-8.837991 23.167977-8.837991 32.005969 0 8.838991 8.838991 8.838991 23.169977 0 32.007968L532.14248 990.612033a22.556978 22.556978 0 0 1-16.003984 6.628993zM510.479501 72.501929c-12.498988 0-22.631978 10.13099-22.631977 22.631978V355.399653c0 12.497988 10.13299 22.630978 22.631977 22.630978 12.499988 0 22.631978-10.13299 22.631978-22.630978V95.133907c0-12.500988-10.13199-22.631978-22.631978-22.631978z" fill="#ffffff" p-id="12564"></path><path d="M506.519505 27.804973a22.555978 22.555978 0 0 0-16.001984 6.627993L370.001639 154.946849c-8.837991 8.837991-8.837991 23.168977 0 32.007968 8.838991 8.837991 23.167977 8.837991 32.006968 0L522.52249 66.438935c8.838991-8.837991 8.838991-23.168977 0-32.006969a22.552978 22.552978 0 0 0-16.002985-6.626993z" fill="#ffffff" p-id="12565"></path><path d="M516.138496 27.804973a22.552978 22.552978 0 0 0-16.001984 6.627993c-8.839991 8.837991-8.839991 23.168977 0 32.006969L620.649394 186.954817c8.837991 8.837991 23.167977 8.837991 32.005969 0 8.838991-8.838991 8.838991-23.169977 0-32.007968L532.14248 34.432966a22.555978 22.555978 0 0 0-16.003984-6.627993zM951.351071 513.370499c0 12.498988-10.13299 22.632978-22.630978 22.632978H668.452347c-12.497988 0-22.631978-10.13399-22.631978-22.632978 0-12.499988 10.13399-22.630978 22.631978-22.630978h260.267746c12.497988 0 22.630978 10.13099 22.630978 22.630978z" fill="#ffffff" p-id="12566"></path><path d="M996.048027 517.331495a22.556978 22.556978 0 0 1-6.627993 16.002984L868.905151 653.849361c-8.837991 8.837991-23.168977 8.837991-32.005968 0-8.839991-8.837991-8.839991-23.167977 0-32.005968l120.513882-120.515883c8.837991-8.837991 23.167977-8.837991 32.006969 0a22.553978 22.553978 0 0 1 6.627993 16.003985z" fill="#ffffff" p-id="12567"></path><path d="M996.048027 507.713504c0 5.789994-2.206998 11.582989-6.627993 16.002985-8.838991 8.837991-23.168977 8.837991-32.006969 0L836.899183 403.201606c-8.839991-8.838991-8.839991-23.167977 0-32.006968 8.836991-8.837991 23.167977-8.837991 32.005968 0L989.420034 491.70952a22.552978 22.552978 0 0 1 6.627993 16.003984zM71.30893 513.370499c0 12.498988 10.13099 22.632978 22.632978 22.632978h260.265746c12.498988 0 22.631978-10.13399 22.631978-22.632978 0-12.499988-10.13299-22.630978-22.631978-22.630978H93.940908c-12.501988 0-22.631978 10.13099-22.631978 22.630978z" fill="#ffffff" p-id="12568"></path><path d="M26.610974 517.331495a22.557978 22.557978 0 0 0 6.628994 16.002984L153.75385 653.849361c8.837991 8.837991 23.168977 8.837991 32.007969 0 8.837991-8.837991 8.837991-23.167977 0-32.005968L65.245936 501.32751c-8.836991-8.837991-23.167977-8.837991-32.005968 0a22.554978 22.554978 0 0 0-6.628994 16.003985z" fill="#ffffff" p-id="12569"></path><path d="M26.610974 507.713504c0 5.789994 2.207998 11.582989 6.628994 16.002985 8.837991 8.837991 23.168977 8.837991 32.005968 0l120.515883-120.514883c8.837991-8.838991 8.837991-23.167977 0-32.006968-8.838991-8.837991-23.169977-8.837991-32.007969 0L33.239968 491.70952a22.553978 22.553978 0 0 0-6.628994 16.003984z" fill="#ffffff"></path></svg></div>
                        <div title="矩形"><svg id="rect" className='tools_not_active' onClick={ highlight_border } viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path transform="scale(0.8)" transform-origin="center" d="M989.726725 1023.102298H29.744866C13.365789 1023.102298 0.039898 1009.777404 0.039898 993.39733V33.416468C0.039898 17.036394 13.365789 3.7115 29.744866 3.7115H989.726725c16.379077 0 29.704968 13.324894 29.704968 29.704968V993.39733c0 16.379077-13.325891 29.704968-29.704968 29.704968z m-949.787951-39.897879h939.59504v-939.59504h-939.59504v939.59504z" fill="#ffffff"></path></svg></div>
                        <div title="三角"><svg id="tria" className='tools_not_active' onClick={ highlight_border } viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M512 192l394.666667 682.666667h-789.333334L512 192m0-85.333333L42.666667 917.333333h938.666666L512 106.666667z" fill="#ffffff"></path></svg></div>    
                        <div title="椭圆"><svg id="circ" className='tools_not_active' onClick={ highlight_border } viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M229.76512 794.23488c155.61728 155.61728 408.84224 155.61728 564.45952 0s155.61728-408.84224 0-564.45952-408.84224-155.61728-564.45952 0S74.14784 638.60736 229.76512 794.23488zM260.73088 260.72064c138.55744-138.55744 364.00128-138.55744 502.55872 0 138.53696 138.5472 138.53696 364.00128 0 502.55872-138.55744 138.5472-364.02176 138.5472-502.55872 0C122.17344 624.72192 122.17344 399.26784 260.73088 260.72064z" fill="#ffffff"></path></svg></div>
                        <div title="向量"><svg id="vect" className='tools_not_active' onClick={ highlight_border } viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M962.011 61.978l-150.243 40.261 39.115 39.139-788.895 788.873 31.75 31.75 788.895-788.873 39.115 39.115z" fill="#ffffff"></path></svg></div>
                        <div title="线段"><svg id="line" className='tools_not_active' onClick={ highlight_border } viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M930.263 61.981l31.756 31.756-868.272 868.272-31.756-31.756 868.272-868.272z" fill="#ffffff"></path></svg></div>
                        <div title="文字"><svg id="text" className='tools_not_active' onClick={ highlight_border } viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M447.326316 161.684211H210.189474c0 26.947368 5.389474 48.505263 5.389473 70.063157v113.178948h26.947369c5.389474-32.336842 5.389474-53.894737 10.778947-75.452632 5.389474-16.168421 16.168421-32.336842 26.947369-43.115789 10.778947-10.778947 21.557895-21.557895 37.726315-21.557895 16.168421-5.389474 37.726316-5.389474 64.673685-5.389474h80.842105v549.726316c0 16.168421 0 32.336842-5.389474 43.11579 0 10.778947-5.389474 21.557895-16.168421 26.947368-5.389474 5.389474-16.168421 10.778947-32.336842 16.168421-16.168421 5.389474-32.336842 5.389474-53.894737 5.389474v26.947368h285.642105v-26.947368c-21.557895 0-43.115789-5.389474-59.28421-5.389474-16.168421 0-26.947368-5.389474-32.336842-10.778947-5.389474-5.389474-10.778947-10.778947-10.778948-21.557895 0-5.389474-5.389474-16.168421-5.389473-26.947368V194.021053h86.231579c26.947368 0 48.505263 0 64.673684 5.389473 16.168421 5.389474 32.336842 10.778947 37.726316 26.947369 32.336842 10.778947 37.726316 26.947368 43.115789 43.115789 5.389474 16.168421 10.778947 43.115789 16.168421 64.673684h26.947369v-48.505263-43.115789c0-16.168421 0-26.947368 5.389473-43.11579 0-16.168421 0-32.336842 5.389474-48.505263h-253.305263c-26.947368 10.778947-48.505263 10.778947-64.673684 10.778948h-53.894737z" fill="#ffffff"></path></svg></div>
                    </Sider>

                    <Content style={ styles.subContent }>
                        <svg id='painter' xmlns="http://www.w3.org/2000/svg" style={ styles.svg } viewBox="0 0 800 500"></svg>
                        <div id='textPanel' style={ styles.textPanel }>
							<textarea id='inputMath' style={ styles.inputMath } onInput={ renderer } placeholder="输入...(支持行内公式)"></textarea>
							<div id="showMath" style={ styles.showMath }></div>
							<div style={ styles.addText }><Button size="small" onClick={ addText }>添加</Button></div>
                        </div>
                    </Content>

                    <Sider width="150px" style={ styles.rightSider }></Sider>
                </Layout>
            </Content>

         	<Footer style={ styles.footer }>
				©2019 Created by JMx. <a href='https://github.com/jiandandaoxingfu'>github</a><br />
         	</Footer>
        </Layout>
    );
}

const styles = {
    layout: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    header: {
        height: '40px',
        lineHeight: '20px',
        textAlign: 'center',
        padding: '7.5px',
        borderBottom: '1px solid #3b3f41'
    },
    subLayout: {
        height: '100%',
    },
    subContent: {
        backgroundColor: '#3b3f41',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    leftSider: {
        textAlign: 'center',
        backgroundColor: 'black'
    },
    rightSider: {
        backgroundColor: 'black'
    },
    footer: {
        height:  '35px',
        padding: '10px 0',
        textAlign: 'center',
        lineHeight: '15px',
        fontSize: '15px',
        backgroundColor: 'black',
        color: 'gray',
        borderTop: '1px solid #3b3f41'
    },

    button: {
        fontSize: '12px',
        height: '20px',
        borderRadius: '2px',
        marginLeft: '3px',
        color: 'white',
    },
    svg: {
        width: '800px',
        height: '500px',
        backgroundColor: 'white',
        transformOrigin: 'center',
        transform: 'scale(1) translate(0, 0)',
    },

    textPanel: {
    	position: 'absolute',
    	height: '240px',
    	width: '320px',
    	margin: 'auto',
    	padding: '10px',
    	background: 'white',
    	borderRadius: '10px',
    	border: '1px solid black',
    	display: 'none',
    },
    inputMath: {
    	width: '300px',
    	height: '84px',
    	border: 'none',
    	outline: 'none',
    	padding: '10px',
    	borderBottom: '1px solid gray',
    },	
    showMath: {
    	width: '300px',
    	height: '85px',
    	padding: '10px',
    	borderBottom: '1px solid gray',
    },
    addText: {
    	marginTop: '10px',
    	textAlign: 'center',
    }

};

var highlight_border = () => {
    let e = window.event.target;
    if( e.className == 'tools_active' ) return;
    let tools_active = document.getElementsByClassName('tools_active')[0];
    tools_active.setAttribute('class', 'tools_not_active');
    e.setAttribute('class', 'tools_active');
}

var renderer = () => {
	$$('showMath').innerText = $$('inputMath').value;
	window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, $$('showMath')]);
}

var addText = () => {
	console.log($$('showMath').innerHTML);
	document.getElementById('textPanel').style.display = 'none';
}

var scale = 1;
//上下滚动时的具体处理函数
function wheel_handle( delta, ele ) {
    delta = delta > 0 ? 0.1 : -0.1;
	if( ele.parentNode.getAttribute('id') === 'painter' ) ele = ele.parentNode;
    if( ele.getAttribute('id') === 'painter' ) {
        let transform = ele.style.transform;
        scale = parseFloat( transform.replace(/.*?scale\((.*?)\).*/, '$1') ) + delta;
        drager.scale = scale;
        if( scale < 0.3 || scale > 3 ) return;
        transform = transform.replace( /(.*?scale\().*?(\).*?)/, '$1' + scale + '$2' );
        ele.style.transform = transform;
    }
}

new Wheel(wheel_handle).register();
var canvas = new Canvas(null, 0, 0);
var drager = new Drag(null);

var $$ = (id) => {
    return document.getElementById(id);
}
var log = console.log;

window.onload = () => {
    canvas = new Canvas($$('painter'), 800, 500);
    canvas.drawAxis();
    canvas.drawGrid();
}


document.addEventListener('mousedown', (e) => {
	let ele = e.target;
	if( ele.style.transform ) {
		if( !drager || drager.ele !== ele ) drager = new Drag(ele);
		drager.ele = ele;
		drager.mousedown(e);
	}
	if( ele.getAttribute('id') === 'painter' || ele.parentNode.getAttribute('id') === 'painter' ) canvas.mousedown(e);
})

document.addEventListener('mousemove', (e) => {
	if( drager ) drager.mousemove(e);
	if( canvas.isDrawing ) canvas.mousemove(e);
})

document.addEventListener('mouseup', (e) => {
	canvas.mouseup();
	drager.mouseup();
})

document.addEventListener('mouseover', (e) => {
	let ele = e.target;
	if( ele.style && ele.style.transform && canvas.shape === 'move' ) {
		ele.setAttribute('stroke-width', "5");
	}
})

document.addEventListener('mouseout', (e) => {
	let ele = e.target;
	if( ele.style && ele.style.transform ) {
		ele.setAttribute('stroke-width', "2");
	}
})

document.addEventListener('click', (e) => {
    let ele = e.target;
    let tagName = ele.tagName.toLowerCase();
    if( tagName == 'button' ) {
        let action = ele.innerText;
        switch( action ) {
            case '清除':
                break;
            case '复位':
            	canvas.canvas.style.transform = canvas.canvas.style.transform.replace(/translate\(.*?\)/, 'translate(0px, 0px)');
                break;
            case '导出':
                break;
            case '坐标轴':
                $$('axis').style.display = $$('axis').style.display == 'none' ? 'block' : 'none';
                break;
            case '网格':
                $$('grid').style.display = $$('grid').style.display == 'none' ? 'block' : 'none';
                break;
        }
    }
    if( tagName == 'svg' ) {
        if( ele.parentNode.title ) canvas.shape = ele.id;
    }
})

