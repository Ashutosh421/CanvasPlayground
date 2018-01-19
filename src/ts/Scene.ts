import  { Entity } from "../ts/Entity";

export class Scene{

    private entities:Map<string, Entity>;

    constructor(){
        this.entities = new Map<string, Entity>();
    }

    render(context2D:CanvasRenderingContext2D){
        this.entities.forEach(entity => entity.render(context2D));
    }

    public addEntity(entity:Entity){
        this.entities.set(entity.ID, entity);
    }

    public get Entities():Map<string, Entity>{
        return this.entities;
    }
}