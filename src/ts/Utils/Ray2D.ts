import { Vector2D } from "../Vector2D";
import { Entity } from "../Entity";

export class Ray2D extends Entity{

    private startPosition:Vector2D;
    private endPosition:Vector2D;
    
    private direction:Vector2D;
    private distance:Number;


    
    /**
     * Constructs the Ray
     * @param startPosition Starting Point of the Ray
     * @param direction Direction of the Ray
     * @param distance Distance of the Ray
     */ 
    constructor(startPosition:Vector2D , direction:Vector2D, distance:number){
        super("Ray");
        this.startPosition = startPosition;
        this.direction = direction;
        this.distance = distance;
    }

    render(context2D: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
}