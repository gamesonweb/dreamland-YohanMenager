import {Labyrinthe} from "../Labyrinthe.js";
import {Cauchemar} from "../Cauchemar.js";
import { Bonus } from "../Bonus.js";

export class lvl_4 extends Labyrinthe
{
    constructor(scene)
    {
        super([
            new Cauchemar(0.5, 3, "Cauchemar", new BABYLON.Vector3(60, 63, -60), scene, "skeleton.glb", 0.05, [new BABYLON.Vector3(60, 63, -60), new BABYLON.Vector3(280, 63, -240), new BABYLON.Vector3(240, 63, -20)]),
            
        ], //sortie
            [new Bonus({nom: "Sortie", position: new BABYLON.Vector3(200, 5, -270), scene: scene}),
                new Bonus({nom: "Points", position: new BABYLON.Vector3(220, 5, -280), scene: scene, points: 10}),
                new Bonus({nom: "Cle", position: new BABYLON.Vector3(360, 5, -20), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),
                new Bonus({nom: "Cle", position: new BABYLON.Vector3(380, 56, -2), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),
                new Bonus({nom: "Cle", position: new BABYLON.Vector3(120, 5, -120), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),], 
           [         
                
                ],
                new BABYLON.Vector3(220, 10, -340),//point de départ
                scene,
            4,
            540,
            "musique_niveau_4.mp3",
            100);
                
        

        const etage1a=[
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ];
        const etage2=[
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,0,0,0],
            [1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,0],
            [1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,0,1,0],
            [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,1,0],
            [1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0],
            [1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0],
            [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0],
            [1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,0,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        ];
        const etage1b=[
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,2,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1],
            [1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
            [0,0,0,0,1,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
        ];
        this.genererLabyrinthe(etage1a, false);
        this.genererLabyrinthe(etage2, true, 48);
        this.genererLabyrinthe(etage1b, false);

    }
}