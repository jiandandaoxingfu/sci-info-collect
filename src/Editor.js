import { Graph, Rect, Circ, Line } from './Graph.js';

class Editor {	
	constructor(canvas) {
		this.start_pos = {x: 0, y: 0};
		this.editEle = null;
		this.isClick = false;
		this.isEditing = false;
		this.editor = null;
		this.canvas = canvas;
		this.scale = 1;
		this.blockId = '';
	}

	createEditor(ele) {
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
		let d = 4;
		let rect = new Rect( new Graph('rect', {x: x, y: y, height: height, width: width, stroke: '#1890ff', fill: 'none'}).setAttributes().obj );
		let circle_left_top = new Graph('ellipse', {class: 'block', id: 'lt', cx: x, cy: y, rx: d, ry: d, stroke: '#1890ff', fill: '#1890ff'}).setAttributes();
		let circle_right_bottom = new Graph('ellipse', {class: 'block', id: 'rb', cx: x + width, cy: y + height, rx: d, ry: d, stroke: '#1890ff', fill: '#1890ff'}).setAttributes();
		g.appendChild(rect.obj);
		g.appendChild(circle_left_top.obj);
		g.appendChild(circle_right_bottom.obj);
		g.setAttribute('style', `transform: ${transform}`);
		this.canvas.appendChild(g);		
		this.editor = {g: g, rect: rect, circle_lt: circle_left_top, circle_rb: circle_right_bottom};
	}

	mousedown(e) {
		this.isClick = true;
   		this.start_pos = {x: e.clientX, y: e.clientY};
   		this.blockId = e.target.getAttribute('id');
	}

	mousemove(e) {
		let box = this.editor.rect.getBox();
		let { x, y, width, height } = box;
		let id = e.target.getAttribute('id');
		let rect = this.canvas.getBoundingClientRect();
		let moveX = parseInt( ( e.clientX - this.start_pos.x ) / this.scale );
		let moveY = parseInt( ( e.clientY - this.start_pos.y ) / this.scale );
		x += moveX;
		y += moveY;
		if( this.blockId == 'lt' ) {
			height -= moveY;
			width -= moveX;
			if( height > 0 && width > 0 ) {
				this.editor.circle_lt.setAttributes( {cx: x, cy: y} );
				this.editor.rect.setAttributes({x: x, y: y, height: height, width: width});
				switch( this.editEle.obj.tagName.toLowerCase() ) {
					case 'rect':
						this.editEle.setAttributes({x: x, y: y, height: height, width: width});
						break;
					case 'ellipse':
						this.editEle.setAttributes({rx: width/2, ry: height/2, cx: width/2 + x, cy: height/2 + y });
						break;
					case 'line':
						if( this.editEle.k < 0 ) {
							this.editEle.setAttributes({x1: x, y1: y + height, x2: x + width, y2: y});
						} else {
							this.editEle.setAttributes({x1: x, y1: y, x2: x + width, y2: y + height});
						}
						break;
				}
			}
		} else if( this.blockId == 'rb' ) {
			x = x + width;
			y = y + height;
			height += moveY;
			width += moveX;
			if( height > 0 && width > 0 ) {
				this.editor.circle_rb.setAttributes( {cx: x, cy: y} );
				this.editor.rect.setAttributes({height: height, width: width});
				switch( this.editEle.obj.tagName.toLowerCase() ) {
					case 'rect':
						this.editEle.setAttributes({height: height, width: width});
						break;
					case 'ellipse':
						this.editEle.setAttributes({rx: width/2, ry: height/2, cx: x - width/2, cy: y - height/2 });
						break;
					case 'line':
						if( this.editEle.k < 0 ) {
							this.editEle.setAttributes({x1: x, y1: y - height, x2: x - width, y2: y});
						} else {
							this.editEle.setAttributes({x1: x, y1: y, x2: x - width, y2: y - height});
						}
						break;
				}
			}
		}
		this.start_pos = {x: e.clientX, y: e.clientY};
	}

	edit(attrs) {

	}

	mouseup() {
		// this.unedit();
		this.isClick = false;
		this.blockId = '';
	}

	unedit() {
		this.isEditing = false;
		this.editEle = null;
        this.canvas.removeChild(this.editor.g);
        this.editor = null;
	}
}

export default Editor;