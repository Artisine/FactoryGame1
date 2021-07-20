export default class Utility {

	static alphabet = "abcdefghijklmnopqrstuvwxyz";
	static numbers = "0123456789";

	static generate_id(maxChars = 8) {
		let output = "";
		const alphanumeric = this.alphabet + this.numbers;
		for (let i=0; i<maxChars; i+=1) {
			output += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
		}
		return output;
	}



};