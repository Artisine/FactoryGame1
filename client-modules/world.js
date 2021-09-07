import Entity from "./entity.js";





export default class World {


	static GlobalMap = new Map();


	constructor(uid) {
		this.uid = uid;
		this.className = "World";
		this.name = "World";

		this.instancesMap = new Map();

		/**
		 * @var {Canvas | undefined} this.canvas;
		 */
		this.canvas = undefined;

		/**
		 * @var {PhysicsEngine | undefined} this.physicsEngine;
		 */
		this.physicsEngine = undefined;


		if (!World.GlobalMap.has(this.uid)) {
			World.GlobalMap.set(this.uid, this);
		}
	}

	/**
	 * 
	 * @param  {...Entity} ents 
	 */
	addEntity(...ents) {
		ents.forEach((ent) => {
			if (ent instanceof Entity) {
				this.instancesMap.set(ent.id, ent);
				ent.world = this;
			} else {
				throw new Error("Uh oh, ent was not of type Entity");
			}
		});
	}

	/**
	 * 
	 * @param  {...Entity} ents 
	 */
	removeEntity(...ents) {
		ents.forEach((ent) => {
			if (typeof ent === "string" && this.instancesMap.has(ent)) {
				this.instancesMap.get(ent).world = undefined;
				this.instancesMap.delete(ent);
			} else if (ent instanceof Entity) {
				ent.world = undefined;
				this.instancesMap.delete(ent.id);
			} else {
				throw new Error("Uh oh, ent was not of type Entity or string.");
			}

		});
	}

	updateloop() {
		window.requestAnimationFrame(this.updateloop.bind(this));

		this.canvas.wipe();

		// logic first
		for (let [key, obj] of this.instancesMap) {
			obj.logic();
		}
	
		// rendering second
		for (let [key, obj] of this.instancesMap) {
			obj.render();
		}

		// console.log(`update loop`);
	}

	init() {
		
		window.requestAnimationFrame(this.updateloop.bind(this));
		// window.requestAnimationFrame(this.updateloop);

		console.info(`World ${this.uid} init.`);
	}

};