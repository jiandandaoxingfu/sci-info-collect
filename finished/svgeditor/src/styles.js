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
        width: '800',
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

export default styles;