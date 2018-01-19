export class Random{
    public static Range(min:number , max:number):number{
        return Math.random() * (max - min) + min;
    }

    public static RangeInt(min:number , max:number):number{
        return Math.floor(Math.random() * (max - min) + min);
    }
}