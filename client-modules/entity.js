
import Instance from "./instance.js";
import Vector2 from "./vector2.js";

export default class Entity extends Instance {



	constructor() {
		super();

		this.className = "Entity";
		this.name = "Entity";

		this.position = new Vector2(0, 0);
		this.size = new Vector2(50, 50);
		this.velocity = new Vector2(0, 0);
		this.acceleration = new Vector2(0, 0);
		this.rotation = 0; // positive x-axis, rotate clockwise, start at 0, end 2pi radians

		/**
		 * @var {World | undefined} this.world;
		 */
		this.world = undefined;

		this.transparency = 0;
		// 0 = opaque, visible
		// 1 = transparent, not visible

		
		
	}

	logic() {
		if (this.world === undefined) {
			return 0;
		}
		this.pre_logic();

	}

	render() {
		if (this.transparency >= 1 || this.world === undefined) {
			return 0;
		}
		this.pre_render();

	}

	pre_logic() {
		return 0;
	}

	pre_render() {
		return 0;
	}
};