import { Vector2D } from "../Vector2D";
import { Color } from "../Color";
import { Entity } from "../Entity";

export class Line extends Entity{

    private showEdges = false;
    private startPosition:Vector2D = Vector2D.Zero;
    private endPosition:Vector2D = Vector2D.Zero;
    private lineWidth:number = 2;
    private resizable:boolean = false;
    public color:Color = Color.Black;
    public highlightColor:Color = Color.Blue;
    private controlRadiusSize:number = 10;

    private currentCircle:number = -1;

    //Line Equation Coefficients
    private A:number = 0;
    private B:number = 0;
    private C:number = 0;

    private slope:number = 0;
    private yIntercept:number = 0;
    private intersectionPoint:Vector2D = Vector2D.Zero;
    private intersectionDetected:boolean = false;

    constructor(id:string ,startPos:Vector2D , endPos:Vector2D){
        super(id);
        this.startPosition = startPos;
        this.endPosition = endPos;
        this.updateLineCoefficients();
        this.updateSlopeInterceptForm();
    }

    render(context2D:CanvasRenderingContext2D){
        context2D.strokeStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`;
        context2D.beginPath();
        context2D.lineWidth = this.lineWidth;
        context2D.moveTo(this.startPosition.x , this.startPosition.y);
        context2D.lineTo(this.endPosition.x , this.endPosition.y);
        context2D.stroke();
        context2D.closePath();

        if(this.showEdges){
            context2D.strokeStyle = this.currentCircle === 0 ? `rgba(${this.highlightColor.r}, ${this.highlightColor.g}, ${this.highlightColor.b}, ${this.highlightColor.a})` : `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
            context2D.beginPath();
            context2D.arc(this.startPosition.x, this.startPosition.y, this.controlRadiusSize, 0, 360);
            context2D.stroke();
            context2D.closePath();

            context2D.strokeStyle = this.currentCircle === 1 ? `rgba(${this.highlightColor.r}, ${this.highlightColor.g}, ${this.highlightColor.b}, ${this.highlightColor.a})` : `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
            context2D.beginPath();
            context2D.arc(this.endPosition.x, this.endPosition.y, this.controlRadiusSize, 0, 360);
            context2D.stroke();
            context2D.closePath();
        }

        this.renderCollision(context2D);
    }

    public onMouseEnter(mousePosition:Vector2D){
        // console.log(`Mouse Enter ${mousePosition.x} ${mousePosition.y}`);
    }

    public onMouseDown(mousePosition:Vector2D){
        ///Check if the Mouse Down lies inside the Circle
        const distanceAtFirstCircle = Vector2D.distance(this.startPosition , mousePosition);
        this.currentCircle = distanceAtFirstCircle < (this.controlRadiusSize * 1.5) ? 0 : -1;
        
        const distanceAtSecondCircle = Vector2D.distance(this.endPosition , mousePosition);
        distanceAtSecondCircle < (this.controlRadiusSize * 1.5 )&& (this.currentCircle = 1);
    }

    public onMouseUp(mousePosition:Vector2D){
        this.currentCircle = -1;
    }

    public onMouseMove(mousePosition:Vector2D){
        this.currentCircle === 0 && (this.startPosition = mousePosition);
        this.currentCircle === 1 && (this.endPosition = mousePosition);

        if(this.currentCircle === 0 || this.currentCircle === 1){
            this.updateLineCoefficients();
            //console.log(`Line Equation A${this.A} + B${this.B} = C${this.C}`);  
            this.updateSlopeInterceptForm();
            // console.log(`Line Equation y = ${this.slope}x + ${this.yIntercept}`);
        } 
    }

    public setResizable(resizable:boolean){
        this.resizable = resizable;
        return this;
    }

    public setShowEdges(showEdges:boolean){
        this.showEdges = showEdges;
        return this;
    }

    public setColor(color:Color){
        this.color = color;
        return this;
    }   

    private updateLineCoefficients(){
        this.A = this.endPosition.y - this.startPosition.y;
        this.B = this.startPosition.x - this.endPosition.x;
        this.C = (this.A * this.startPosition.x) + (this.B * this.startPosition.y);
    }

    private updateSlopeInterceptForm(){
        this.slope = (this.endPosition.y - this.startPosition.y)/(this.endPosition.x - this.startPosition.x);
        this.yIntercept = this.endPosition.y - (this.slope * this.endPosition.x);
    }

    public get CoffA():number{
        return this.A;
    }

    public get CoffB():number{
        return this.B;
    }

    public get CoffC():number{
        return this.C;
    }

    public get Slope():number{
        return this.slope;
    }   

    public get YIntercept():number{
        return this.yIntercept;
    }

    public checkIntersection(line:Line){
        if(this.slope === line.slope){
            this.intersectionDetected = false;
        }
        else{
            this.intersectionPoint.x = (line.yIntercept - this.yIntercept)/(this.slope - line.slope);
            this.intersectionPoint.y = this.slope * this.intersectionPoint.x + this.yIntercept;

            const lineDirection1 = Vector2D.subtract(this.endPosition , this.startPosition);
            const pointDirection = Vector2D.subtract(this.endPosition , this.intersectionPoint);;

            const lineLine1 = Vector2D.dot(lineDirection1 , lineDirection1);
            const linePoint1 = Vector2D.dot(lineDirection1 , pointDirection);

            const lineDirection2 = Vector2D.subtract(line.endPosition , line.startPosition);
            const pointDirection2 = Vector2D.subtract(line.endPosition , this.intersectionPoint);
            const lineLine2 = Vector2D.dot(lineDirection2 , lineDirection2);
            const linePoint2 = Vector2D.dot(lineDirection2 , pointDirection2);
            
            if(linePoint1 > 0 && linePoint1 < lineLine1 && linePoint2 > 0 && linePoint2 < lineLine2){
                this.intersectionDetected = true;
            }
            else{
                this.intersectionDetected = false;
            }
        }
    }

    public renderCollision(context2D:CanvasRenderingContext2D){
        if(this.intersectionDetected){
            context2D.strokeStyle = `rgba(255,0,0,1)`;
            context2D.beginPath();
            context2D.arc(this.intersectionPoint.x, this.intersectionPoint.y , this.controlRadiusSize , 0 , 360);
            context2D.stroke();
            context2D.closePath();
        }
    }
}

