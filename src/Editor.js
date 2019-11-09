import { Graph, Rect, Circ, Line } from './Graph.js';

class Editor {	
	constructor(canvas) {
		this.start_pos = {x: 0, y: 0};
		this.editEle = null;
		this.isEditing = false;
		this.editor = null;
		this.canvas = canvas;
	}

	createEditor(ele) {
		this.isEditing = true;
		let graph;
		switch( ele.tagName.toLowerCase() ) {
			case 'rect':
				graph = new Rect(ele);
				break;
			case 'ellipse':
				graph = new Circ(ele);
				break;
			case 'vect':
				// graph = new Graph(ele);
				break;
			case 'line':
				graph = new Line(ele);
				break;
		}
		if( !graph ) return;
		this.editEle = graph;
		let { x, y, height, width, transform } = graph.getBox();
		let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		let d = 3;
		let rect = new Graph('rect', {x: x, y: y, height: height, width: width, stroke: '#1890ff', fill: 'none'}).setAttributes().obj;
		let rect_left_top = new Graph('rect', {class: 'block', x: x - d, y: y - d, height: 2 * d, width: 2 * d, stroke: '#1890ff', fill: '#1890ff'}).setAttributes().obj;
		let rect_right_bottom = new Graph('rect', {class: 'block', x: x + width - d , y: y + height - d, height: 2 * d, width: 2 * d, stroke: '#1890ff', fill: '#1890ff'}).setAttributes().obj;
		g.appendChild(rect);
		g.appendChild(rect_left_top);
		g.appendChild(rect_right_bottom);
		g.setAttribute('style', `transform: ${transform}`);
		this.canvas.appendChild(g);
		this.editor = g;
	}

	mousedown(e) {
   		this.start_pos = {x: e.clientX, y: e.clientY};
	}


	unedit() {
		this.isEditing = false;
		this.editEle = null;
        this.canvas.removeChild(this.editor);
        this.editor = null;
	}
}

export default Editor;