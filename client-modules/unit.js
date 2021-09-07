
import { MainCanvas, TestMap } from "../client.js";
import Vector2 from "./vector2.js";
import Entity from "./entity.js";


class UnitConnection extends Entity {

	/**
	 * 
	 * @param {Unit} unitA 
	 * @param {Unit} unitB 
	 */
	constructor(unitA, unitB) {
		super();
		this.className = "UnitConnection";
		this.name = "UnitConnection";

		this.id = `${unitA.id}-${unitB.id}`;

		/**
		 * @type {Unit} this.unitA
		 */
		this.unitA = unitA;

		/**
		 * @type {Unit} this.unitB
		 */
		this.unitB = unitB;
	}

	disconnect() {
		if (Unit.Connections.has(this.id)) {
			if (this.unitA) {
				this.unitA.connections.delete(this.id);
			}
			if (this.unitB) {
				this.unitB.connections.delete(this.id);
			}
			this.unitA = undefined;
			this.unitB = undefined;
			Unit.Connections.delete(this.id);
			console.log(`[Disconnect] ${this.className} ${this.id} called disconnect`);
		}
	}

	pre_render() {
		// console.log(`aaaaa`);
		if (this.unitA && this.unitB) {
			MainCanvas.ctx.beginPath();
			MainCanvas.ctx.moveTo(this.unitA.position.x, this.unitA.position.y);
			MainCanvas.ctx.lineTo(this.unitB.position.x, this.unitB.position.y);
			MainCanvas.ctx.closePath();
			MainCanvas.strokePrevious("blue");
		}
	}
};

export default class Unit extends Entity {

	static UnitConnection = UnitConnection;

	/**
	 * @type {Map<string, Unit>} GlobalMap;
	 */
	static GlobalMap = new Map();

	/**
	 * @type {Map<Array<string>, UnitConnection} Connections;
	 */
	static Connections = new Map();

	static init() {
		console.log({Unit});
	}

	constructor() {
		super();

		this.className = "Unit";
		this.name = "Unit";

		this.size = new Vector2(20, 20);
		// console.log(this.size);

		/**
		 * @type {Map<string, UnitConnection>} this.connections;
		 */
		this.connections = new Map();

	}


	/**
	 * Connect to another unit.
	 * @param {Unit | string} unit
	 */
	connectTo(unitDescriptor) {
		let unit = undefined;
		if (typeof unitDescriptor === "string") {
			unit = Unit.GlobalMap.get(unitDescriptor);
		} else if (unitDescriptor instanceof Unit) {
			unit = unitDescriptor;
		} else {
			throw new Error(`Unit Descriptor ${unitDescriptor} is not a valid descriptor.`);
		}

		
		if (unit.id === this.id) {
			console.log(`Cannot connect to ${this.selfLog()} self?`);
			return 1;
		}

		const searching = [...this.connections.keys()].filter((item) => {
			return item.includes(this.id);
		});
		if (searching.length === 0 ) {
			const conn = new UnitConnection(this, unit);
			this.connections.set(conn.id, conn);
			unit.connections.set(conn.id, conn);
			Unit.Connections.set(conn.id, conn);
			TestMap.addEntity(conn);
			console.log(`[Create] Unit Connection ${conn.id}`);
		} else {
			console.log(`[Create Failure] Unit Connection ${searching} exists`);
		}

	}

	/**
	 * 
	 * @param {Unit | string} unitDescriptor 
	 */
	disconnectFrom(unitDescriptor) {
		let unit = undefined;
		if (typeof unitDescriptor === "string") {
			unit = Unit.GlobalMap.get(unitDescriptor);
		} else if (unitDescriptor instanceof Unit) {
			unit = unitDescriptor;
		} else {
			throw new Error(`Unit Descriptor ${unitDescriptor} is not a valid descriptor.`);
		}

		if (unit.id === this.id) {
			console.log(`Cannot disconnect from ${this.selfLog()} self?`);
			return 1;
		}

		const searching = [...this.connections.keys()].find((item) => {
			return (item.includes(this.id) && item.includes(unit.id));
		});
		if (searching && this.connections.has(searching)) {
			const conn = this.connections.get(searching);
			console.log(`[Disconnect From] ${this.selfLog()} disconnecting ${unit.selfLog()}`);
			conn.disconnect();
		} else {
			console.log(`[Disconnect Failure] ${this.selfLog()} does not have ${unit.selfLog()} indexed`);
		}
	}

	disconnectAll() {
		if (this.connections.size > 0) {
			this.connections.forEach((valConn, key) => {
				console.log(`[Disconnect] ${this.selfLog()} disconnect`);
				valConn.disconnect();
			});
		} else {
			console.log(`[Disconnect Failure] ${this.selfLog()} No UnitConnections on self.`);
		}
	}


	pre_render() {
		MainCanvas.centerSquare(this.position.x, this.position.y, this.size.x, this.size.y);
		MainCanvas.strokePrevious("black");
		MainCanvas.fillPrevious("grey");

	}

};