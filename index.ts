import "./src/styles/main.scss";
import { Vector2D } from "./src/ts/Vector2D";
import { Rectangle } from "./src/ts/Shapes/Rectangle";
import { ZoomAtPointHandler } from "./src/ts/ZoomAtPoint";
import { Line } from "./src/ts/Shapes/Line";
import { Color } from "./src/ts/Color";
import { Scene } from "./src/ts/Scene/Scene";
import { Entity } from "./src/ts/Entity";
import { Random } from "./src/ts/Utils/Random";
import { Circle } from "./src/ts/Shapes/Circle";

let entityCounter: number = 0;
let mouseLocation: Vector2D;

let scene: Scene;
let canvas: HTMLCanvasElement;
let canvasContext2D: CanvasRenderingContext2D;
let displaySize: Vector2D = new Vector2D(1024, 768);
let zoomHandler: ZoomAtPointHandler;

let pointLight: Circle = new Circle(`Light_${entityCounter++}`, new Vector2D(100, 100), 30);
let ray1: Line = new Line(`Line_0`, pointLight.position, Vector2D.Zero);
let ray2: Line = new Line(`Line_1`, pointLight.position, new Vector2D(displaySize.x, 0));
let ray3: Line = new Line(`Line_2`, pointLight.position, new Vector2D(displaySize.x, displaySize.y));
let ray4: Line = new Line(`Line_3`, pointLight.position, new Vector2D(0, displaySize.y));


(function () {
    canvas = document.createElement('canvas');   //Creating the Canvas
    document.body.appendChild(canvas);   //Appending the Canvas to the document
    initCanvas();
    requestAnimationFrame(renderLoop);

    // addRandomLine();
    // addRandomLine();
    
})();

/**
 * Initializes the canvas
 */
function initCanvas() {
    canvas.setAttribute("id", "mainCanvas");
    canvas.setAttribute("width", displaySize.x.toString());
    canvas.setAttribute("height", displaySize.y.toString());

    canvasContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    zoomHandler = new ZoomAtPointHandler(canvasContext2D, canvas);

    scene = new Scene();
    scene.addEntity(pointLight);
    scene.addEntity(ray1);
    scene.addEntity(ray2);
    scene.addEntity(ray3);
    scene.addEntity(ray4);
    
    ray1.setPosition(pointLight.position);
    ray2.setPosition(pointLight.position);
    ray3.setPosition(pointLight.position);
    ray4.setPosition(pointLight.position);
}

/**
 * Render Loop. Calls every frame
 */
let translationPoint = Vector2D.Zero;;
function renderLoop() {
    canvasContext2D.fillStyle = 'rgba(200,200,200,255)';
    canvasContext2D.clearRect(0, 0, displaySize.x, displaySize.y);
    canvasContext2D.fillRect(0, 0, displaySize.x, displaySize.y);

    scene.render(canvasContext2D);

    requestAnimationFrame(renderLoop);
}

canvas.addEventListener('mouseenter', event => scene.Entities.forEach(entity => entity.onMouseEnter(new Vector2D(event.offsetX, event.offsetY))));

canvas.addEventListener('mousedown', event => scene.Entities.forEach(entity => entity.onMouseDown(new Vector2D(event.offsetX, event.offsetY))));

canvas.addEventListener('mousemove', event => scene.Entities.forEach(entity => entity.onMouseMove(new Vector2D(event.offsetX, event.offsetY))));

canvas.addEventListener('mouseup', event => scene.Entities.forEach(entity => entity.onMouseUp(new Vector2D(event.offsetX, event.offsetY))));

window.addEventListener('keydown', event => {
    //console.log(`Key Down ${event.keyCode}`);
    
    //console.log(`Random Range ${Random.RangeInt(10,100)}`);
    addRandomLine();
});

function addRandomLine(){
    const line: Line = new Line(`Line_${entityCounter++}`, new Vector2D(Random.RangeInt(0, displaySize.x), Random.RangeInt(0, displaySize.y)), new Vector2D(Random.RangeInt(0, displaySize.x), Random.RangeInt(0, displaySize.y)));
    line.setColor(new Color(0, 0, 0, 1)).setShowEdges(true).setResizable(true);
    scene.addEntity(line);
}