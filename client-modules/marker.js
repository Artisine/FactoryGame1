
import Entity from "./entity.js";

import {
	MainCanvas
} from "../client.js";
import Vector2 from "./vector2.js";

export default class Marker extends Entity {


	constructor() {
		super();

		this.className = "Marker";
		this.name = "Marker";

		this.size = new Vector2(25, 25);
	}

	pre_render() {
		MainCanvas.circle(this.position.x, this.position.y, this.size.x / 2);
		MainCanvas.strokePrevious("black");
		MainCanvas.fillPrevious("blue");

		// console.log("Marker visible");
	}
};