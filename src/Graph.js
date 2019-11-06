class Graph {
    constructor(type, attributes) {
        this.obj = document.createElementNS('http://www.w3.org/2000/svg', type);
        this.type = type;
        this.attributes = attributes;
        this.attributes.stroke = 'black';
        this.attributes.strokeWidth = 2;
    }

    update( attributes ) { 
        if( attributes === undefined ) attributes = this.attributes;
        for( let attr in attributes ) {
            this.obj.setAttribute(attr, attributes[attr]);
            this.attributes[attr] = attributes[attr];
        }
        this.obj.style.transform = 'translate(0px, 0px)';
        return this;
    }
}


// class Rect extends Graph {
//     constructor(rect, attr) {
//         super();
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.fill = 'none';
//     }
// }

// class Circle extends Graph {
//     constructor() {
//         super();
//     }
// }

// class Triangle extends Graph {
//     constructor() {
//         super();
//     }
// }

// class Vector extends Graph {
//     constructor() {
//         super();
//     }
// }

// class Line extends Graph {
//     constructor() {
//         super();
//     }
// }

export default Graph;