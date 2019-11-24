class Graph {
    constructor(type, attributes, obj) {
        this.box = {x: 0, y: 0, height: 0, width: 0};
        if( !obj ) {
            this.obj = document.createElementNS('http://www.w3.org/2000/svg', type);
            this.type = type;
            if( attributes.isTransform ) this.obj.style.transform = 'translate(0px, 0px)';
            if( !attributes.stroke ) attributes.stroke = 'black';
            if( !attributes.strokeWidth ) attributes.strokeWidth = 2;
            this.attributes = attributes;
        } else {
            this.obj = obj;
            this.attributes = {};
        }
    }

    setAttributes( attributes ) { 
        if( attributes === undefined ) attributes = this.attributes;
        for( let attr in attributes ) {
            this.obj.setAttribute(attr, attributes[attr]);
            this.attributes[attr] = attributes[attr];
        }
        return this;
    }

    getAttributes( attributes ) {
        let attrs = {};
        for( let attr of attributes ) {
            attrs[attr] = this.obj.getAttribute(attr) || this.obj.style[attr];
        }
        return attrs;
    }
}


class Rect extends Graph {
    constructor(obj) {
        super(null, null, obj);
    }

    getBox() {
        this.box = {
            x: parseFloat(this.obj.getAttribute('x')),
            y: parseFloat(this.obj.getAttribute('y')),
            height: parseFloat(this.obj.getAttribute('height')),
            width: parseFloat(this.obj.getAttribute('width')),
            transform: this.obj.style.transform,
        }
        this.box.center = {x: this.box.x + this.box.width/2, y: this.box.y + this.box.height/2};
        return this.box;
    }
}

class Circ extends Graph {
    constructor(obj) {
        super(null, null, obj);
    }

    getBox() {
        let cx = parseFloat(this.obj.getAttribute('cx'));
        let cy = parseFloat(this.obj.getAttribute('cy'));
        let rx = parseFloat(this.obj.getAttribute('rx'));
        let ry = parseFloat(this.obj.getAttribute('ry'));

        this.box = {
            x: cx - rx,
            y: cy - ry,
            height: ry * 2,
            width: rx * 2,
            transform: this.obj.style.transform,
            center: {x: cx, y: cy}
        }
        return this.box;
    }
}

class Triangle extends Graph {
    constructor(obj) {
        super(null, null, obj);
    }

   
}

class Vector extends Graph {
    constructor(obj) {
        super(null, null, obj);
    }

   
}

class Line extends Graph {
    constructor(obj) {
        super(null, null, obj);

        let x1 = parseFloat(  obj.getAttribute('x1') ),
            x2 = parseFloat(  obj.getAttribute('x2') ),                    
            y1 = parseFloat(  obj.getAttribute('y1') ),                    
            y2 = parseFloat(  obj.getAttribute('y2') );                    
        this.k = (y1 - y2) / (x1 - x2);
    }

    getBox() {
        let x1 = parseFloat(this.obj.getAttribute('x1'));
        let y1 = parseFloat(this.obj.getAttribute('y1'));
        let x2 = parseFloat(this.obj.getAttribute('x2'));
        let y2 = parseFloat(this.obj.getAttribute('y2'));
        this.box = {
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.abs(x2 - x1),
            height: Math.abs(y2 - y1),
            transform: this.obj.style.transform,
            center: {x: (x1+x2)/2, y: (y1+y2)/2},
            isRT: y2 - y1 > 0,
        }
        return this.box;
    }
}

export {Graph, Rect, Circ, Line};