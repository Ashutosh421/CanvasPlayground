import { Scene } from "../Scene";
import { SceneComponent } from "../SceneComponent";
import { Line } from "../../Shapes/Line";
import { Entity } from "../../Entity";

export class LineCollisionEngine implements SceneComponent {
    private scene: Scene;
    private lineList: Array<Line> = new Array<Line>();

    constructor(scene: Scene) {
        this.scene = scene;
        this.refreshLineList();
    }

    init(): void {

    }
    update(): void {
        for (let i = 0; i < this.lineList.length; i++) {
            const lineToCheck = this.lineList[i];
            for (let j = i + 1; j < this.lineList.length; j++) {
                lineToCheck.checkIntersection(this.lineList[j]);
            }
        }
    }
    delete(): void {

    }

    refreshLineList() {
        const entitiesArray: Array<Entity> = Array.from(this.scene.Entities.values());
        this.lineList = entitiesArray.filter(entity => entity instanceof Line) as Array<Line>;
    }
}