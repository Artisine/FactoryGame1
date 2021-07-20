

export default class Canvas {

	

	constructor(initArgs = {}) {
		this.canvasElement = undefined;
		this.renderingContext = undefined;
		this.ctx = undefined;

		this.width = 0;
		this.height = 0;
		this.halfWidth = 0;
		this.halfHeight = 0;

		if (Object.keys(initArgs).length > 0) {
			for (let key in initArgs) {
				this[key] = initArgs[key];
			}
		}

		this.renderQueue = [];
	}
	init() {
		if (!this.canvasElement) {
			this.canvasElement = document.createElement("canvas");
			document.querySelector("#canvas-container").appendChild(this.canvasElement);
		}
		this.setCanvas(this.canvasElement);
		return this;
	}
	setCanvas(canvasElement) {
		this.canvasElement = canvasElement;
		this.renderingContext = this.canvasElement.getContext("2d");
		this.ctx = this.renderingContext;
	}


	registerWorld(world) {

	}
	deregisterWorld(world) {
		
	}

	// addToRenderQueue(instance) {
	// 	this.renderQueue.push(instance);
	// }


	circle(x, y, r) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI * 2);
		this.ctx.closePath();
	}
	rect(x, y, w, h) {
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.closePath();
	}
	square(x, y, sx, sy) {
		this.rect(x, y, sx, sy);
	}
	centerSquare(x, y, sx, sy) {
		this.square(x, y, x + sx/2, y + sy/2);
	}


	strokePrevious(styleString) {
		this.ctx.strokeStyle = styleString;
		this.ctx.stroke();
	}
	fillPrevious(styleString) {
		this.ctx.fillStyle = styleString;
		this.ctx.fill();
	}



};


