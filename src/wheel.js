class Wheel {
	constructor(handle) {
		this.handle = handle;
	} 

	listener(event) {
    	var delta = 0;
    	if ( !event ) event = window.event;
    	if ( event.wheelDelta ) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        	delta = event.wheelDelta/120; 
        	if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
    	} else if ( event.detail ) {//FF浏览器使用的是detail,其值为“正负3”
        	delta = -event.detail/3;
    	}
    	if ( delta ) this.handle( delta, event.target );
	}

	register() {
		if (window.addEventListener) {//FF,火狐浏览器会识别该方法
    		window.addEventListener('DOMMouseScroll', this.listener.bind(this), false);
    		window.onmousewheel = document.onmousewheel = this.listener.bind(this); 
		}
	}
}

export default Wheel;