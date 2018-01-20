import  { Entity } from "../Entity";
import { SceneComponent } from "./SceneComponent";
import { LineCollisionEngine } from "./Components/LineCollisionEngine";

export class Scene{

    private entities:Map<string, Entity>;
    private components:Array<SceneComponent>;
    private lineCollisionEngine:LineCollisionEngine;

    constructor(){
        this.entities = new Map<string, Entity>();
        this.components = new Array<SceneComponent>();
        this.lineCollisionEngine = this.addComponent<LineCollisionEngine>(LineCollisionEngine) as LineCollisionEngine;
    }

    render(context2D:CanvasRenderingContext2D){
        this.entities.forEach(entity => entity.render(context2D));
        this.components.forEach(component=> component.update());
    }

    public addEntity(entity:Entity){
        this.entities.set(entity.ID, entity);
        this.lineCollisionEngine.refreshLineList();
    }

    public get Entities():Map<string, Entity>{
        return this.entities;
    }

    public addComponent<T extends SceneComponent>(com:{new(scene:Scene):T}){
        let component = this.components.find(component=>component.constructor.name === com.name);
        !component &&  (component = new com(this), this.components.push(component));
        return component;
    }

    public removeComponent<T extends SceneComponent>(com:{new():T}){
        const component = this.components.find(component => component.constructor.name === com.name);
        component && this.components.splice(this.components.indexOf(component),1);
    }

    public showComponents(){
        this.components.forEach(component=> console.log(`Component ${component.constructor.name}`));
    }
}