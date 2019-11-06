// var drag_start_pos;

// $$('painter').ondragstart = (e) => {
//     drag_start_pos = {x: e.clientX, y: e.clientY};
// }
    
// $$('painter').ondrag = function(e) {
//     let ele = e.target;
//     let tag = ele.tagName.toLowerCase();
//     if( tag === 'svg' || tag === 'line' || tag === 'rect' || tag === 'circle') {
//         ele.style.transform = `translate(${e.clientX - drag_start_pos.x}, ${e.clientY - drag_start_pos.y})`;
//     }
// }    
// $$('painter').ondragend = function(e) {
        
// }

// var log = console.log
class Drag {
	constructor( ele ) {
		this.start_pos = {x: 0, y: 0};
		this.ele = ele;
		this.isDrag = true;
		this.scale = 1;
		this.isDragStart = false;
	}

	mousedown(e) {
		this.isDrag = document.getElementById('move').getAttribute('class') == 'tools_active';
		if( this.isDrag ) {
			this.isDragStart = true;
    		this.start_pos = {x: e.clientX, y: e.clientY};
    	} 
	}

	mousemove(e) {
		if( this.isDragStart ) {
    		let tf = this.ele.style.transform;
    		let tl = tf.match(/([0-9-.])+px[,]?/g).map( (d) => parseFloat(d) );
    		let x = (e.clientX - this.start_pos.x)/this.scale + tl[0];
    		let y = (e.clientY - this.start_pos.y)/this.scale + tl[1];
    		this.start_pos = {x: e.clientX, y: e.clientY};
        	this.ele.style.transform = tf.replace(/[0-9-.]+px, [0-9-.]+px/, `${x}px, ${y}px`);
       	}
	}

	mouseup() {
		this.isDragStart = false;
	}
}

export default Drag;