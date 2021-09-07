


export default class Vector2 {



	constructor(...initArgs) {
		this.className = "Vector2";
		this.x = undefined;
		this.y = undefined;
		this.selfSet(...initArgs);


	}

	get magnitude() {
		return Math.hypot(this.x, this.y);
	}

	add(...operand) {
		if (operand.length === 2) {
			return new Vector2(this.x + operand[0], this.y + operand[1]);
		} else if (operand.length === 1 && operand[0] instanceof Vector2) {
			return new Vector2(this.x + operand[0].x, this.y + operand[0].y);
		} else if (operand.length === 1 && typeof operand[0] === "object") {
			return new Vector2(this.x + operand[0].x, this.y + operand[0].y);
		} else {
			throw new Error("Addition went wrong");
		}
	}

	sub(...operand) {
		if (operand.length === 2) {
			return new Vector2(this.x - operand[0], this.y - operand[1]);
		} else if (operand.length === 1 && operand[0] instanceof Vector2) {
			return new Vector2(this.x - operand[0].x, this.y - operand[0].y);
		} else if (operand.length === 1 && typeof operand[0] === "object") {
			return new Vector2(this.x - operand[0].x, this.y - operand[0].y);
		} else {
			throw new Error("Subtraction went wrong");
		}
	}
	minus(...operand) {
		return this.sub(operand);
	}

	/**
	 * 
	 * @param {Vector2} otherVec 
	 * @returns number
	 */
	dotProduct(otherVec) {
		return (otherVec.x * this.x + otherVec.y * this.y);
	}



	selfSet(...initArgs) {
		// console.log({initArgs});
		if (initArgs.length === 2) {
			this.x = initArgs[0];
			this.y = initArgs[1];
		} else if (initArgs.length === 1 && initArgs[0] instanceof Vector2) {
			this.x = initArgs[0].x;
			this.y = initArgs[0].y;
		} else if (initArgs.length === 1 && typeof initArgs[0] === "object" && initArgs[0].length !== undefined) {
			this.x = initArgs[0];
			this.y = initArgs[1];
		} else if (initArgs.length === 1 && typeof initArgs[0] === "object") {
			this.x = initArgs[0].x;
			this.y = initArgs[0].y;
		} else {
			throw new Error("Invalid parameters provided to Vector2.");
		}
	}
};