export class Color{

    private rgba:Float32Array;

    constructor(r:number , g:number , b:number , a:number){
        this.rgba = new Float32Array(4);
        this.rgba[0] = r; this.rgba[1] = g; this.rgba[2] = b; this.rgba[3] = a;
    }

    public static get Red():Color{
        return new Color(255,0,0,1);
    }

    public static get Green():Color{
        return new Color(0,255,0,1);
    }

    public static get Blue():Color{
        return new Color(0,0,255,1);
    }

    public set r(r:number){
        this.rgba[0] = r;
    }

    public get r():number{
        return this.rgba[0];
    }

    public set g(g:number){
        this.rgba[1] = g;
    }

    public get g():number{
        return this.rgba[1];
    }

    public set b(b:number){
        this.rgba[2] = b;
    }

    public get b():number{
        return this.rgba[2];
    }
}