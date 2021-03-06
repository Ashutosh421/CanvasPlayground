import "./src/styles/main.scss";
import { Vector2D } from "./src/ts/Vector2D";
import { Rectangle } from "./src/ts/Shapes/Rectangle";
import { ZoomAtPointHandler } from "./src/ts/ZoomAtPoint";
import { Line } from "./src/ts/Shapes/Line";
import { Color } from "./src/ts/Color";
import { Scene } from "./src/ts/Scene/Scene";
import { Entity } from "./src/ts/Entity";
import { Random } from "./src/ts/Utils/Random";

let entityCounter:number = 0;
let mouseLocation:Vector2D;

let scene:Scene;
let canvas:HTMLCanvasElement;
let canvasContext2D: CanvasRenderingContext2D;
let displaySize:Vector2D = new Vector2D(1366,768);
let zoomHandler:ZoomAtPointHandler;
let line:Line = new Line(`Line_${entityCounter++}`,new Vector2D(100,100), new Vector2D(200,100));
line.setColor(new Color(0,0,0,1)).setShowEdges(true).setResizable(true);

let line1:Line = new Line(`Line_${entityCounter++}`,new Vector2D(200,200), new Vector2D(400,200));
line1.setColor(new Color(0,0,0,1)).setShowEdges(true).setResizable(true);

(function(){
    canvas = document.createElement('canvas');   //Creating the Canvas
    document.body.appendChild(canvas);   //Appending the Canvas to the document
    initCanvas();
    requestAnimationFrame(renderLoop);
})();

/**
 * Initializes the canvas
 */
function initCanvas(){
    canvas.setAttribute("id","mainCanvas");
    canvas.setAttribute("width",displaySize.x.toString());
    canvas.setAttribute("height",displaySize.y.toString());

    canvasContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    zoomHandler = new ZoomAtPointHandler(canvasContext2D , canvas);

    scene = new Scene();
    scene.addEntity(line);
    scene.addEntity(line1);
}

/**
 * Render Loop. Calls every frame
 */
let translationPoint = Vector2D.Zero;;
function renderLoop(){
    canvasContext2D.fillStyle = 'rgba(200,200,200,255)';
    canvasContext2D.clearRect(0,0,displaySize.x,displaySize.y);
    canvasContext2D.fillRect(0,0,displaySize.x,displaySize.y);

    scene.render(canvasContext2D);
    //line.checkIntersection(line1);

    requestAnimationFrame(renderLoop);
}

canvas.addEventListener('mouseenter', event=> scene.Entities.forEach(entity=>entity.onMouseEnter(new Vector2D(event.offsetX, event.offsetY))));

canvas.addEventListener('mousedown', event=> scene.Entities.forEach(entity=>entity.onMouseDown(new Vector2D(event.offsetX, event.offsetY))));

canvas.addEventListener('mousemove', event=> scene.Entities.forEach(entity=>entity.onMouseMove(new Vector2D(event.offsetX, event.offsetY))));

canvas.addEventListener('mouseup', event=> scene.Entities.forEach(entity=>entity.onMouseUp(new Vector2D(event.offsetX, event.offsetY))));

window.addEventListener('keydown', event=>{
    //console.log(`Key Down ${event.keyCode}`);
    const line:Line = new Line(`Line_${entityCounter++}`, new Vector2D(Random.RangeInt(0,displaySize.x),Random.RangeInt(0,displaySize.y)), new Vector2D(Random.RangeInt(0,displaySize.x), Random.RangeInt(0,displaySize.y)));
    line.setColor(new Color(0,0,0,1)).setShowEdges(true).setResizable(true);
    scene.addEntity(line);
    //console.log(`Random Range ${Random.RangeInt(10,100)}`);
});