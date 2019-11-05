class Canvas {
	constructor(canvas, width, height) {
		this.canvas = canvas;
		this.height = height;
		this.width = width;
		this.scale = 1;
		this.translate = {x: 0, y: 0};
		// this.children = [];
	}

	drawAxis() {
		let g = window.document.createElementNS('http://www.w3.org/2000/svg','g');
		g.setAttribute('id', 'axis');
		let line1 = createLine(0, this.height/2, this.width, this.height/2, 'black', 2);
		let line2 = createLine(this.width/2, 0, this.width/2, this.height, 'black', 2);
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
			let line1 = createLine(x1, 0, x1, this.height, 'black', 1);
			let line2 = createLine(x2, 0, x2, this.height, 'black', 1);
			g.appendChild(line2);
			g.appendChild(line1);
		}

		for(let i=0; i<this.height / (2*y_step); i++) {
			let y1 = this.height/2 + i*y_step;
			let y2 = this.height/2 - i*y_step;
			let line1 = createLine(0, y1, this.width, y1, 'black', 1);
			let line2 = createLine(0, y2, this.width, y2, 'black', 1);
			g.appendChild(line1);
			g.appendChild(line2);
		}
		this.canvas.appendChild(g);
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