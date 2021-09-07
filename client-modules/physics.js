import World from "./world.js";


export class PhysicsService {

	static currentTime = undefined;
	static lastTime = undefined;
	static timeDelta = 0;
	static engines = [];

	static updateloop() {
		window.requestAnimationFrame(PhysicsService.updateloop);

		PhysicsService.currentTime = (new Date()).getTime();
		PhysicsService.timeDelta = (PhysicsService.currentTime - PhysicsService.lastTime) / 1000;


		for (let engine of PhysicsService.engines) {
			engine.updateloop( PhysicsService.timeDelta );
		}

		PhysicsService.lastTime = PhysicsService.currentTime;
	}
	static init() {
		PhysicsService.lastTime = (new Date()).getTime();
		window.requestAnimationFrame(PhysicsService.updateloop);
	}
};

export class PhysicsEngine {


	constructor() {
		this.className = "PhysicsEngine";

		this.worldsMap = new Map();
		this.instancesMap = new Map();

		if (!PhysicsService.engines.includes(this)) {
			PhysicsService.engines.push(this);
		}
	}

	registerWorld(world) {
		if (world instanceof World) {
			this.worldsMap.set(world.uid, world);
			world.physicsEngine = this;
		}
	}
	deregisterWorld(world) {
		if (typeof world === "string") {
			this.worldsMap.get(world).physicsEngine = undefined;
			this.worldsMap.delete(world);
		}
		if (world instanceof World) {
			world.physicsEngine = undefined;
			this.worldsMap.delete(world.uid);
		}
	}


	updateloop(dt) {
		for (let [worldUID, world] of this.worldsMap) {
			const arrEnts = [...world.instancesMap.values()];
			this._movement(arrEnts, dt);
			// this._bounceWithinCanvasBoundaries(arrEnts, dt, world);

		}
	}
	_movement(entitiesArray, dt) {
		// console.log(entitiesArray);

		for (let ent of entitiesArray) {
			ent.velocity.selfSet(
				ent.velocity.x + ent.acceleration.x * dt,
				ent.velocity.y + ent.acceleration.y * dt
			);
			ent.position.selfSet(
				ent.position.x + ent.velocity.x * dt,
				ent.position.y + ent.velocity.y * dt
			);

		}
	}
	_bounceWithinCanvasBoundaries(entitiesArray, dt, world) {

		for (let ent of entitiesArray) {
			
			if (ent.position.x > world.canvas.width) {
				ent.position.x = world.canvas.width - ent.size.x/2 - 1;
				ent.velocity.x *= (-1 * dt);
				ent.acceleration.x *= (-1 * dt);
			}
			if (ent.position.x < ent.size.x / 2) {
				ent.position.x = ent.size.x/2 + 1;
				ent.velocity.x *= (-1 * dt);
				ent.acceleration.x *= (-1 * dt);
			}
			if (ent.position.y > world.canvas.height) {
				ent.position.y = world.canvas.height - ent.size.y/2 - 1;
				ent.velocity.y *= (-1 * dt);
				ent.acceleration.y *= (-1 * dt);
			}
			if (ent.position.y < ent.size.y / 2) {
				ent.position.y = ent.size.y/2 + 1;
				ent.velocity.y *= (-1 * dt);
				ent.acceleration.y *= (-1 * dt);
			}
		}
	}
	_checkCollisions() {
		
	}

};