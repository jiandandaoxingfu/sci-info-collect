import { Graph, Rect, Circ, Line } from './Graph.js';

class Canvas {
	constructor(canvas, width, height) {
		this.canvas = canvas;
		this.height = height;
		this.width = width;
		this.scale = 1;
		this.translate = {x: 0, y: 0};
		this.shape = 'move';
		this.currentEle = {obj: null};
		this.isDrawing = false;
		this.isMove = false;
		this.click_pos = {x: 0, y: 0};
	}

	drawAxis() {
		let g = window.document.createElementNS('http://www.w3.org/2000/svg','g');
		g.setAttribute('id', 'axis');
		let line1 = new Graph('line', {x1: 0, y1: this.height/2, x2: this.width, y2: this.height/2}).setAttributes().obj;
		let line2 = new Graph('line', {x1: this.width/2, y1: 0, x2: this.width/2, y2: this.height}).setAttributes().obj;
		g.appendChild(line1);
		g.appendChild(line2);
		this.canvas.appendChild(g);
	}

	drawGrid() {
		let x_step = 30;
		let y_step = 30;
		let g = window.document.createElementNS('http://www.w3.org/2000/svg','g');
		g.setAttribute('id', 'grid');
		for(let i=0; i<this.width / (2*x_step); i++) {
			let x1 = this.width/2 + i*x_step;
			let x2 = this.width/2 - i*x_step;
			let line1 = new Graph('line', {x1: x1, y1: 0, x2: x1, y2: this.height, stroke: 'rgba(0, 0, 0, 0.1)'}).setAttributes().obj;;
			let line2 = new Graph('line', {x1: x2, y1: 0, x2: x2, y2: this.height, stroke: 'rgba(0, 0, 0, 0.1)'}).setAttributes().obj;;
			g.appendChild(line2);
			g.appendChild(line1);
		}

		for(let i=0; i<this.height / (2*y_step); i++) {
			let y1 = this.height/2 + i*y_step;
			let y2 = this.height/2 - i*y_step;
			let line1 = new Graph('line', {x1: 0, y1: y1, x2: this.width, y2: y1, stroke: 'rgba(0, 0, 0, 0.1)'}).setAttributes().obj;;
			let line2 = new Graph('line', {x1: 0, y1: y2, x2: this.width, y2: y2, stroke: 'rgba(0, 0, 0, 0.1)'}).setAttributes().obj;;
			g.appendChild(line1);
			g.appendChild(line2);
		}
		this.canvas.appendChild(g);
	}

	createRect(x, y) {
		return new Graph('rect', {class: 'editable', x: x, y: y, height: 0, width: 0, fill: 'white', 'fill-opacity': 0, isTransform: true}).setAttributes();
	}

	createTriangle() {

	}

	createCircle(x, y) {
		return new Graph('ellipse', {class: 'editable', cx: x, cy: y, rx: 0, ry: 0, fill: 'white', 'fill-opacity': 0, isTransform: true}).setAttributes();
	}

	createVector(x, y) {
		return new Graph('vector', {}).setAttributes();
	}

	createLine(x, y) {
		return new Graph('line', {class: 'editable', x1: x, y1: y, x2: x, y2: y, isTransform: true}).setAttributes();
	}

	addText(text) {
		let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		rect.setAttribute('width', text.getAttribute('width'));
		rect.setAttribute('height', text.getAttribute('height'));
		rect.setAttribute('viewBox', text.getAttribute('viewBox'));
		rect.setAttribute('fill-opacity', 0);
		rect.setAttribute('class', 'textRect');
		g.appendChild(text);
		g.appendChild(rect);
		g.style.transform = `translate(${this.click_pos.x}px, ${this.click_pos.y}px)`;
		g.setAttribute('class', 'text');
		this.canvas.appendChild(g);
	}

	mousedown(e, action) {
		this.shape = action;
		let rect = this.canvas.getBoundingClientRect();
		let clickX = ( (e.clientX - rect.x) * this.scale ).toFixed(0);
		let clickY = ( (e.clientY - rect.y) * this.scale ).toFixed(0);
		this.click_pos = {x: clickX, y: clickY};
		let graph = null;
		switch( action ) { 
			case 'move':
				return;
			case 'rect':
				graph = this.createRect(clickX, clickY);
				break;
			case 'circ':
				graph = this.createCircle(clickX, clickY);
				break;
			case 'vect':
				graph = this.createVector(clickX, clickY);
				break;
			case 'line':
				graph = this.createLine(clickX, clickY);
				break;
			case 'text':
				document.getElementById('textPanel').style.display = 'block';
				break;
		}
		if( graph ) {
			this.canvas.appendChild(graph.obj);
			this.currentEle = graph;
			this.isDrawing = true;
		};
	}
	mousemove(e) {
		let graph = this.currentEle;
		let rect = this.canvas.getBoundingClientRect();
		let clickX = parseInt( (e.clientX - rect.x) * this.scale );
		let clickY = parseInt( (e.clientY - rect.y) * this.scale );
		let attr;
		switch(this.shape) { 
			case 'rect':
				attr = { width: clickX - graph.attributes.x, height: clickY - graph.attributes.y };
				if( attr.width <= 0 || attr.height <= 0 ) return;
				break;
			case 'circ':
				attr = { rx: clickX - graph.attributes.cx, ry: clickY - graph.attributes.cy };
				if( attr.rx <= 0 || attr.ry <= 0 ) return;
				break;
			case 'vect':
				graph.setAttributes( { width: clickX - graph.attributes.x, height: clickY - graph.attributes.y } );
				break;
			case 'line':
				attr = { x2: clickX, y2: clickY };
				break;
		}
		if( attr ) {
			graph.setAttributes( attr );
			this.isMove = true;
		}
	}

	mouseup(e) {
		if( !this.isMove ) this.canvas.removeChild(this.currentEle.obj);
		this.isDrawing = false;
		this.isMove = false;
	}

}

export default Canvas;