class Drag {
	constructor() {
		this.start_pos = {x: 0, y: 0};
		this.ele = null;
		this.isDrag = true;
		this.scale = 1;
		// this.isDragStart = false;
	}

	mousedown(e) {
   		this.start_pos = {x: e.clientX, y: e.clientY};
	}

	mousemove(e) {
    	let tf = this.ele.style.transform;
    	let tl = tf.match(/([0-9-.])+px[,]?/g).map( (d) => parseInt(d) );
    	let x = (e.clientX - this.start_pos.x)/this.scale + tl[0];
    	let y = (e.clientY - this.start_pos.y)/this.scale + tl[1];
    	this.start_pos = {x: e.clientX, y: e.clientY};
        this.ele.style.transform = tf.replace(/[0-9-.]+px, [0-9-.]+px/, `${x}px, ${y}px`);
	}

	mouseup() {
		this.isDragStart = false;
		this.ele = null;
	}
}

export default Drag;