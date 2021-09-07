
import Utility from "./client-modules/utility.js";
import Vector2 from "./client-modules/vector2.js";
import Canvas from "./client-modules/canvas.js";
import Instance from "./client-modules/instance.js";
import Entity from "./client-modules/entity.js";
import Marker from "./client-modules/marker.js";
import Unit from "./client-modules/unit.js";
import World from "./client-modules/world.js";
import { PhysicsEngine, PhysicsService } from "./client-modules/physics.js";



export const MainCanvas = new Canvas({
	canvasElement: document.querySelector("#canvas-container > canvas")
}).init();

export const MainEngine = new PhysicsEngine();

// console.log(MainCanvas);

export const TestMap = new World("TestMap");

MainEngine.registerWorld(TestMap);
MainCanvas.registerWorld(TestMap);
TestMap.init();

console.info(TestMap);


const sam = new Marker();
sam.position.selfSet(100, 100);
TestMap.addEntity(sam);
console.log({sam});

// sam.velocity.selfSet(30, 50);
// sam.acceleration.selfSet(10, 10);

// setInterval(()=>{

// }, );

// const bob = new Unit();
// bob.position.selfSet(100, 100);

// const jill = new Unit();
// jill.position.selfSet(350, 350);

// let unitpositions = [
// 	[300, 300], [500, 300],
// 	[300, 500], [500, 500]
// ];
// for (let i=0; i<10; i+=1) {
// 	for (let k=0; k<10; k += 1) {
// 		unitpositions.push([i * 20, k * 20]);
// 	}
// }
// let theunits = [];
// for (let i=0; i<100; i +=1) {
// 	const newunit = new Unit();
// 	newunit.position.selfSet(500 + unitpositions[i][0], 500 + unitpositions[i][1]);
// 	newunit.velocity.selfSet(
// 		((Math.random()*2)-1)*20,
// 		((Math.random()*2)-1)*20
// 	);
// 	theunits.push(newunit);
// }
// for (let x=0; x<theunits.length; x+=1) {
// 	for (let y=theunits.length-1; y>0; y -= 1) {
// 		theunits[x].connectTo(theunits[y]);
// 	}
// }
// setInterval(()=>{
// 	theunits.forEach((unit)=>{
// 		unit.velocity.selfSet(
// 			((Math.random()*2)-1)*20,
// 			((Math.random()*2)-1)*20
// 		);
// 	});
// }, 5000);

// try {
// 	bob.connectTo(jill);
// 	jill.connectTo(bob);
// 	bob.disconnectFrom(jill);
// 	jill.disconnectFrom(bob);

// } catch(e) {
// 	throw new Error(e);
// }

// console.log({bob, jill});
// TestMap.addEntity(...theunits);
Unit.init();



PhysicsService.init();


console.info(`%c[MAIN client.js] %cLoaded and ready.`, "color: purple", "color: darkgreen");