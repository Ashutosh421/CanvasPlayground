export class Vector2D{
    private vector2D:Float32Array = new Float32Array(2);

    constructor(x:number = 0 , y:number = 0){
        this.vector2D[0] = x; this.vector2D[1] = y;
    }

    public set x(x:number){
        this.vector2D[0] = x;
    }

    public get x():number{
        return this.vector2D[0];
    }

    public set y(y:number){
        this.vector2D[1] = y;
    }

    public get y():number{
        return this.vector2D[1];
    }

    public static get Zero():Vector2D{
        return new Vector2D(0,0);
    }
}