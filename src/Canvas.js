import Graph from './Graph.js';

class Canvas {
	constructor(canvas, width, height) {
		this.canvas = canvas;
		this.height = height;
		this.width = width;
		this.scale = 1;
		this.translate = {x: 0, y: 0};
		this.shape = 'move';
		this.currentEle = null;
		this.isDrawing = false;
	}

	drawAxis() {
		let g = window.document.createElementNS('http://www.w3.org/2000/svg','g');
		g.setAttribute('id', 'axis');
		let line1 = createLine(0, this.height/2, this.width, this.height/2, 'black', 1);
		let line2 = createLine(this.width/2, 0, this.width/2, this.height, 'black', 1);
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
			let line1 = createLine(x1, 0, x1, this.height, 'rgba(0, 0, 0, 0.1)', 1);
			let line2 = createLine(x2, 0, x2, this.height, 'rgba(0, 0, 0, 0.1)', 1);
			g.appendChild(line2);
			g.appendChild(line1);
		}

		for(let i=0; i<this.height / (2*y_step); i++) {
			let y1 = this.height/2 + i*y_step;
			let y2 = this.height/2 - i*y_step;
			let line1 = createLine(0, y1, this.width, y1, 'rgba(0, 0, 0, 0.1)', 1);
			let line2 = createLine(0, y2, this.width, y2, 'rgba(0, 0, 0, 0.1)', 1);
			g.appendChild(line1);
			g.appendChild(line2);
		}
		this.canvas.appendChild(g);
	}

	createRect(x, y) {
		return new Graph('rect', {x: x, y: y, height: 0, width: 0, fill: 'white', 'fill-opacity': 0}).update();
	}

	createTriangle() {

	}

	createCircle(x, y) {
		return new Graph('ellipse', {cx: x, cy: y, rx: 0, ry: 0, fill: 'white', 'fill-opacity': 0}).update();
	}

	createVector(x, y) {
		return new Graph('vector', {}).update();
	}

	createLine(x, y) {
		return new Graph('line', {x1: x, y1: y, x2: x, y2: y}).update();
	}

	createText(x, y, text) {

	}

	add(obj) {
		this.canvas.appendChild(obj);
	}

	mousedown(e) {
		let rect = this.canvas.getBoundingClientRect();
		let clickX = (e.clientX - rect.x) * this.scale;
		let clickY = (e.clientY - rect.y) * this.scale;
		let graph = null;
		switch(this.shape) { 
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
			this.add(graph.obj);
			this.currentEle = graph;
			this.isDrawing = true;
		};
	}
	mousemove(e) {
		let graph = this.currentEle;
		let rect = this.canvas.getBoundingClientRect();
		let clickX = (e.clientX - rect.x) * this.scale;
		let clickY = (e.clientY - rect.y) * this.scale;
		let attr;
		switch(this.shape) { 
			case 'rect':
				attr = { width: clickX - graph.attributes.x, height: clickY - graph.attributes.y };
				if( attr.width < 0 || attr.height <0 ) return;
				graph.update( attr );
				break;
			case 'circ':
				attr = { rx: clickX - graph.attributes.cx, ry: clickY - graph.attributes.cy };
				if( attr.rx < 0 || attr.ry <0 ) return;
				graph.update( attr );
				break;
			case 'vect':
				graph.update( { width: clickX - graph.attributes.x, height: clickY - graph.attributes.y } );
				break;
			case 'line':
				graph.update( { x2: clickX, y2: clickY } );
				break;
			case 'text':
				break;
		}
	}

	mouseup(e) {
		this.isDrawing = false;
	}



}

function createLine(x1, y1, x2, y2, stroke, stroke_width) {
	let line = window.document.createElementNS('http://www.w3.org/2000/svg','line');
	line.setAttribute('x1', x1);
	line.setAttribute('y1', y1);
	line.setAttribute('x2', x2);
	line.setAttribute('y2', y2);
	line.setAttribute('style', `stroke: ${stroke}; stroke-width: ${stroke_width};`);
	return line;
}

export default Canvas;