
import Utility from "./client-modules/utility.js";
import Vector2 from "./client-modules/vector2.js";
import Canvas from "./client-modules/canvas.js";
import Instance from "./client-modules/instance.js";
import Entity from "./client-modules/entity.js";
import Marker from "./client-modules/marker.js";
import World from "./client-modules/world.js";



export const MainCanvas = new Canvas({
	canvasElement: document.querySelector("#canvas-container > canvas")
}).init();

console.log(MainCanvas);

export const TestMap = new World("TestMap");

MainCanvas.registerWorld(TestMap);
TestMap.init();



const sam = new Marker();
sam.position.selfSet(100, 100);
TestMap.addEntity(sam);
console.log({sam});




console.info(`%c[MAIN client.js] %cLoaded and ready.`, "color: purple", "color: darkgreen");