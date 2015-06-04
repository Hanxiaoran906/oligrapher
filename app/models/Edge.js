const NodeDisplaySettings = require('../NodeDisplaySettings');
var Immutable = require('immutable');

class Edge {
  //constructor(EdgeSpecs) -> Edge
  constructor(specs){
    this.id = specs.id || this.generateId();
    this.n1 = specs.n1;
    this.n2 = specs.n2;
    this.content = specs.content || {};
    this.display = specs.display || {};
    this.updatePosition();
  }

  generateId(){
    return `x${Math.random() * 1000000000000}`;
  }

  updatePosition(){
    let x1 = this.n1.display.x;
    let y1 = this.n1.display.y;
    let x2 = this.n2.display.x;
    let y2 = this.n2.display.y;
    let r1 = this.n1.display.scale * NodeDisplaySettings.defaultCircleRadius;
    let r2 = this.n2.display.scale * NodeDisplaySettings.defaultCircleRadius;

    // set edge position at midpoint between nodes
    let ax = this.display.x = (x1 + x2) / 2;
    let ay = this.display.y = (y1 + y2) / 2;

    let xa, ya, xb, yb;

    if (x1 < x2){
      xa = x1;
      ya = y1;
      xb = x2;
      yb = y2;
      this.display.is_reverse = false;
    } else {
      xa = x2;
      ya = y2;
      xb = x1;
      yb = y1;
      this.display.is_reverse = true;
    }

    let cx, cy;
    let n = 0.5;

    if (this.display.cx != null && this.display.cy != null){
      cx = this.display.cx;
      cy = this.display.cy;
    } else {
      cx = -(ya - ay) * n + ax;
      cy = (xa - ax) * n + ay;
    }

    // lines should stop at edge of node circles
    let ra = (this.display.is_reverse ? r2 : r1);
    let rb = (this.display.is_reverse ? r1 : r2);
    let dxma = xa - cx;
    let dyma = ya - cy;
    let dxmb = xb - cx;
    let dymb = yb - cy;
    let rma = Math.sqrt(dxma * dxma + dyma * dyma);
    let rmb = Math.sqrt(dxmb * dxmb + dymb * dymb);
    let xma = ra * dxma / rma;
    let yma = ra * dyma / rma;
    let xmb = rb * dxmb / rmb;
    let ymb = rb * dymb / rmb;

    console.log(this.display.is_reverse);

    this.display.xa = xa - xma;
    this.display.ya = ya - yma;
    this.display.xb = xb - xmb;
    this.display.yb = yb - ymb;
    this.display.cx = cx;
    this.display.cy = cy;
  }
}

module.exports = Edge;

// EdgeSpecs
// {
//   id: Int,
//   n1: {},
//   n2: {}
//   content: {},
//   display: {},
// }
