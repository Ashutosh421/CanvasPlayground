import { Vector2D } from "./Vector2D";

export abstract class Entity{

    private id:string;

    constructor(id:string){this.id = id;}

    abstract render(context2D:CanvasRenderingContext2D):void;

    public onMouseEnter(mousePosition:Vector2D){}

    public onMouseDown(mousePosition:Vector2D){}

    public onMouseUp(mousePosition:Vector2D){}

    public onMouseMove(mousePosition:Vector2D){}

    public get ID():string{
        return this.id;
    }
}