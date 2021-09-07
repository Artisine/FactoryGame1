import Utility from "./utility.js";


export default class Instance {

	static GlobalList = [];
	static GlobalMap = new Map();

	static create() {
		return new Instance();
	}

	constructor() {
		this.id = Utility.generate_id();
		this.className = "Instance";
		this.name = "Instance";

		if (!Instance.GlobalMap.has(this.id)) {
			Instance.GlobalMap.set(this.id, this);
		}
	}

	selfLog() {
		return `${this.className} ${this.name} ${this.id}`;
	}
};