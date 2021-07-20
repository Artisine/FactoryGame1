import World from "./world.js";


export default class Canvas {

	

	constructor(initArgs = {}) {
		this.canvasElement = undefined;
		this.renderingContext = undefined;
		this.ctx = undefined;

		this.worldsMap = new Map();

		this.width = 0;
		this.height = 0;
		this.halfWidth = 0;
		this.halfHeight = 0;

		if (Object.keys(initArgs).length > 0) {
			for (let key in initArgs) {
				this[key] = initArgs[key];
			}
		}

		this.visible = true;
		this.resizeObserver = undefined;

		
		this.renderQueue = [];
	}
	init() {
		if (!this.canvasElement) {
			this.canvasElement = document.createElement("canvas");
			document.querySelector("#canvas-container").appendChild(this.canvasElement);
		}
		this.setCanvas(this.canvasElement);
		// const resizeObserver = new ResizeObserver(entries => {
		// 	for (let entry of entries) {
		// 	  if(entry.contentBoxSize) {
		// 		// Firefox implements `contentBoxSize` as a single content rect, rather than an array
		// 		const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
				
		// 		h1Elem.style.fontSize = Math.max(1.5, contentBoxSize.inlineSize / 200) + 'rem';
		// 		pElem.style.fontSize = Math.max(1, contentBoxSize.inlineSize / 600) + 'rem';
		// 	  } else {
		// 		h1Elem.style.fontSize = Math.max(1.5, entry.contentRect.width / 200) + 'rem';
		// 		pElem.style.fontSize = Math.max(1, entry.contentRect.width / 600) + 'rem';
		// 	  }
		// 	}
			
		// 	console.log('Size changed');
		//   });
		this.resizeObserver = new ResizeObserver((entries)=>{
			// console.log(entries);
			const found = entries.find((item) => item.target === this.canvasElement);
			if (found) {
				this.width = found.contentRect.width;
				this.height = found.contentRect.height;
				this.halfWidth = this.width / 2;
				this.halfHeight = this.height / 2;
				// console.log(found);
				this.resize();
			}
		});
		this.resizeObserver.observe(this.canvasElement);
		this.resize();

		return this;
	}

	resize() {
		this.canvasElement.width = this.width;
		this.canvasElement.height = this.height;
		
	}
	setCanvas(canvasElement) {
		this.canvasElement = canvasElement;
		this.renderingContext = this.canvasElement.getContext("2d");
		this.ctx = this.renderingContext;
	}


	registerWorld(world) {
		if (world instanceof World) {
			this.worldsMap.set(world.uid, world);
			world.canvas = this;
		}
	}
	deregisterWorld(world) {
		if (typeof world === "string") {
			this.worldsMap.get(world).canvas = undefined;
			this.worldsMap.delete(world);
		}
		if (world instanceof World) {
			world.canvas = undefined;
			this.worldsMap.delete(world.uid);
		}
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


