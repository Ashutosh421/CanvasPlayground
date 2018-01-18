import "./src/styles/main.scss";
import { Vector2D } from "./src/ts/Vector2D";
import { Rectangle } from "./src/ts/Shapes/Rectangle";
import { ZoomAtPointHandler } from "./src/ts/ZoomAtPoint";

let canvas:HTMLCanvasElement;
let canvasContext2D: CanvasRenderingContext2D;
let displaySize:Vector2D = new Vector2D(1024,768);
let zoomHandler:ZoomAtPointHandler;

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
}

/**
 * Render Loop. Calls every frame
 */
let translationPoint = Vector2D.Zero;;
function renderLoop(){
    canvasContext2D.fillStyle = 'rgba(2,242,242,255)';
    canvasContext2D.clearRect(0,0,displaySize.x,displaySize.y);
    canvasContext2D.fillRect(0,0,displaySize.x,displaySize.y);

    canvasContext2D.fillStyle = 'rgba(100,100,200,255)';

    canvasContext2D.save();
    canvasContext2D.beginPath();
    canvasContext2D.arc(100,100,10,0,360);
    canvasContext2D.fill();
    canvasContext2D.closePath();

    canvasContext2D.restore();

    canvasContext2D.strokeStyle = 'rgba(50,50,50,255)';
    canvasContext2D.lineWidth = 3;
    canvasContext2D.save();
    canvasContext2D.translate(200,100);
    canvasContext2D.scale(2,2);
    canvasContext2D.rotate(1);
    canvasContext2D.translate(-200,-100);
    canvasContext2D.beginPath();
    canvasContext2D.moveTo(200,100);
    canvasContext2D.lineTo(300,100);
    canvasContext2D.stroke();
    canvasContext2D.closePath();
    canvasContext2D.restore();



    requestAnimationFrame(renderLoop);
}