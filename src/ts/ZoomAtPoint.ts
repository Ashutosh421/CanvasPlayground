export class ZoomAtPointHandler{

    private canvas2DContext:CanvasRenderingContext2D;
    private canvasElement:HTMLCanvasElement;
    private scaleFactor:number = 0.01;
    private canvasScale:number = 1;

    constructor(canvas2DContext:CanvasRenderingContext2D, canvas:HTMLCanvasElement){
        this.canvas2DContext = canvas2DContext;
        this.canvasElement = canvas;

        this.canvasElement.addEventListener('mousewheel', event=> this.zoomHandle.call(this, event));
    }

    private zoomHandle(event:MouseWheelEvent){
        if(event.deltaY > 0){
            if(this.canvasScale < 1){
                this.canvasScale = 1;
            }
            this.canvasScale += this.scaleFactor;
        }
        if(event.deltaY < 0){
            if(this.canvasScale > 1){
                this.canvasScale = 1;
            }
            this.canvasScale -= this.scaleFactor;
        }
        this.canvas2DContext.save();
        this.canvas2DContext.translate(event.offsetX, event.offsetY);
        this.canvas2DContext.scale(this.canvasScale,this.canvasScale);
        this.canvas2DContext.translate(-event.offsetX, -event.offsetY);
    }
}
