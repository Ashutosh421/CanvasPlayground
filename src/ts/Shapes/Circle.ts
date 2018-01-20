import { Entity } from "../Entity";
import { Vector2D } from "../Vector2D";
import { Color } from "../Color";

export class Circle extends Entity{

    private color:Color = Color.Black;
    private hightLightColor:Color = Color.Blue;
    public position:Vector2D = Vector2D.Zero;
    private radius:number = 10;
    private selected:boolean = false;
    
    constructor( id:string , position:Vector2D , radius:number){
        super(id);
        this.position = position;
        this.radius = radius;
    }

    render(context2D: CanvasRenderingContext2D): void {
        context2D.strokeStyle = !this.selected ? `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})` : `rgba(${this.hightLightColor.r},${this.hightLightColor.g},${this.hightLightColor.b},${this.hightLightColor.a})`;        
        context2D.beginPath();
        context2D.lineWidth = 2;
        context2D.arc(this.position.x, this.position.y, this.radius , 0 , 360);
        context2D.stroke();
        context2D.closePath();
    }

    onMouseDown(mousePosition:Vector2D){
        const distance = Vector2D.distance(this.position , mousePosition);
        this.selected =  distance < (this.radius * 1.5) ? true : false;
    }

    onMouseMove(mousePosition:Vector2D){
        this.selected && (this.position = mousePosition);
    }

    onMouseUp(mousePosition:Vector2D){
        this.selected = false;
    }
}