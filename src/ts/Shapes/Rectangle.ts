import { Vector2D } from "../Vector2D";

export class Rectangle{

    private position:Vector2D = Vector2D.Zero;
    private size:Vector2D = Vector2D.Zero;

    constructor(position:Vector2D , size:Vector2D){
        this.position = position;
        this.size = size;
    }

    public render(context2D:CanvasRenderingContext2D){
        context2D.fillRect(this.position.x , this.position.x, this.size.x , this.size.y);
    }
}