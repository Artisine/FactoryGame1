
import Utility from "./client-modules/utility.js";
import Vector2 from "./client-modules/vector2.js";
import Canvas from "./client-modules/canvas.js";
import Instance from "./client-modules/instance.js";
import Entity from "./client-modules/entity.js";

import World from "./client-modules/world.js";



const MainCanvas = new Canvas({
	canvasElement: document.querySelector("#canvas-container > canvas")
}).init();

console.log(MainCanvas);

const TestMap = new World("TestMap");
TestMap.init();



const bob = new Entity();
console.log(bob);

TestMap.addEntity(bob);

console.log(bob);







console.info(`%c[MAIN client.js] %cLoaded and ready.`, "color: purple", "color: darkgreen");