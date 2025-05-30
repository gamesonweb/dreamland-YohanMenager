import { INiveau } from "../INiveau.js";
import { Plateforme } from "./Plateforme.js";
import { Son } from "./Son.js";

/**
 * représente un labyrinthe, ou niveau du jeu
 */
export class Labyrinthe extends INiveau
{
    #numero;
    nbCle = 0;
    /**
     * 
     * @param {*} ennemis liste des ennemis
     * @param {*} objets liste des objets
     * @param {*} decor liste des objets de décor
     * @param {*} positionDepart position de départ du joueur
     */
    constructor(ennemis, objets, decor, positionDepart, scene, numero, tempsMax, musique="musique.mp3", pointsNiveau = 0)
    {
        super(ennemis, objets, tempsMax, pointsNiveau);
        this.decor = decor;
        this.positionDepart = positionDepart;
        this.scene = scene
        this.#numero = numero;
        this.nav = scene.navigationPlugin;
        for(let objet of this.objets)
        {
            if(objet.requis)
            {
                this.nbCle++;
            }
        }
        Son.changerMusique(musique);
    }

    /**
     * * génère le labyrinthe à partir d'une matrice
     * @param {Array} labyrinthe matrice représentant le labyrinthe
     * 
     * je voulais faire un merge des meshes pour la navmesh et pour optimiser, mais ça cause un gros problème de texture
     */
    genererLabyrinthe(labyrinthe, navigation = true, hauteur = -5) {
        const plateformeBase = new Plateforme(
            20, 20, 10, 0, 0, 0,               // dimensions et position
            "./assets/textures/grass.jpg",                // texture dessus
            "./assets/textures/ground.jpg",               // texture côté
            null,        // normalMap dessus
            null,       // normalMap côté
            this.scene, null, 1.0             // relief, opacité, pas de défilement
        );
    
        // on désactive le mesh de base
        plateformeBase.mesh.setEnabled(false);
    
        const decor = [];
        const meshesPourNavmesh = []; 
    
        for (let z = 0; z < labyrinthe.length; z++) {
            for (let x = 0; x < labyrinthe[z].length; x++) {
                if (labyrinthe[z][x] === 0) {
                    // Créer une instance
                    const instance = plateformeBase.mesh.createInstance(`plateforme_${x}_${z}`);
                    instance.position.set(20 * x, hauteur, -20 * z);
                    instance.checkCollisions = true;
                    instance.metadata = { type: "Sol"};
                    decor.push(instance);
                    if(navigation)
                    {
                        // Créer une boîte simple pour la navmesh
                        const navBox = BABYLON.MeshBuilder.CreateBox("navBox", {
                            width: 20,
                            height: 10,
                            depth: 20
                        }, this.scene);
                        navBox.position = new BABYLON.Vector3(20 * x, hauteur, -20 * z);
                        navBox.isVisible = false;
                        navBox.checkCollisions = false;
        
                        meshesPourNavmesh.push(navBox);                        
                    }

                }
                if(labyrinthe[z][x] === 2)
                {
                    decor.push(Plateforme.Ascenseur(x, z, hauteur+4, hauteur + 57, this.scene));
                    //meshes en plus pour délimiter l'ascenseur, sur sa base et sa position haute, comme ça le joueur sait qu'il y a un ascenseur
                    const boxAvantBas = BABYLON.MeshBuilder.CreateBox("BoxBas", {
                        width: 20,
                        height: 1,
                        depth: 1
                    }, this.scene);
                    boxAvantBas.position = new BABYLON.Vector3(20 * x, hauteur+2.5, -20 * z - 9.5);
                    decor.push(boxAvantBas);
                    const boxArriereBas = BABYLON.MeshBuilder.CreateBox("BoxBasArriere", {
                        width: 20,
                        height: 1,
                        depth: 1
                    }, this.scene);
                    boxArriereBas.position = new BABYLON.Vector3(20 * x, hauteur+2.5, -20 * z + 10);
                    decor.push(boxArriereBas);
                    const boxAvantHaut = BABYLON.MeshBuilder.CreateBox("BoxHaut", {
                        width: 20,
                        height: 1,
                        depth: 1
                    }, this.scene);
                    boxAvantHaut.position = new BABYLON.Vector3(20 * x, hauteur + 55.5, -20 * z - 9.5);
                    decor.push(boxAvantHaut);
                    const boxArriereHaut = BABYLON.MeshBuilder.CreateBox("BoxHautArriere", {
                        width: 20,
                        height: 1,
                        depth: 1
                    }, this.scene);
                    boxArriereHaut.position = new BABYLON.Vector3(20 * x, hauteur + 55.5, -20 * z + 10.5);
                    decor.push(boxArriereHaut);
                    const boxGaucheBas = BABYLON.MeshBuilder.CreateBox("BoxGaucheBas", {
                        width: 1,
                        height: 1,
                        depth: 20
                    }, this.scene);
                    boxGaucheBas.position = new BABYLON.Vector3(20 * x - 9.5, hauteur+2.5, -20 * z);
                    decor.push(boxGaucheBas);
                    const boxDroiteBas = BABYLON.MeshBuilder.CreateBox("BoxDroiteBas", {
                        width: 1,
                        height: 1,
                        depth: 20
                    }, this.scene);
                    boxDroiteBas.position = new BABYLON.Vector3(20 * x + 9.5, hauteur+2.5, -20 * z);
                    decor.push(boxDroiteBas);
                    const boxGaucheHaut = BABYLON.MeshBuilder.CreateBox("BoxGaucheHaut", {
                        width: 1,
                        height: 1,
                        depth: 20
                    }, this.scene);
                    boxGaucheHaut.position = new BABYLON.Vector3(20 * x - 9.5, hauteur + 55.5, -20 * z);
                    decor.push(boxGaucheHaut);
                    const boxDroiteHaut = BABYLON.MeshBuilder.CreateBox("BoxDroiteHaut", {
                        width: 1,
                        height: 1,
                        depth: 20
                    }, this.scene);
                    boxDroiteHaut.position = new BABYLON.Vector3(20 * x + 9.5, hauteur + 55.5, -20 * z);
                    decor.push(boxDroiteHaut);

                }
            }
        }
    
        if(navigation && this.scene.navigationPlugin)
        {
            // Fusionner tous les navBox pour créer la navmesh
            const navmesh = BABYLON.Mesh.MergeMeshes(meshesPourNavmesh, true, false, undefined, false, true);
            navmesh.isVisible = false;
            navmesh.checkCollisions = false;
            navmesh.name = "navmesh";
        
            // Générer la navmesh avec Recast
            this.scene.navigationPlugin.createNavMesh([navmesh], {
                cs: 0.5,
                ch: 0.5,
                walkableSlopeAngle: 45,
                walkableHeight: 1.5,
                walkableClimb: 1,
                walkableRadius: 0.5,
                maxEdgeLen: 12,
                maxSimplificationError: 1.3,
                minRegionArea: 8,
                mergeRegionArea: 20,
                maxVertsPerPoly: 6,
                detailSampleDist: 6,
                detailSampleMaxError: 1,
            });
            
            this.nav.crowd = this.nav.createCrowd(100, 0.1, this.scene);
            //assigner le crowd aux ennemis
            for(let ennemi of this.ennemis)
            {
                ennemi.crowd = this.nav.crowd;
                ennemi.nav = this.nav;
            }            
        }
        
        for(let i = 0; i < decor.length; i++)
        {
            this.decor.push(decor[i]);
        }
        
    }
    
    

    supprimer()
    {
        for(let i = 0; i < this.objets.length; i++)
        {
            this.objets[i].dispose();
        }
        for(let i = 0; i < this.ennemis.length; i++)
        {
            this.ennemis[i].dispose();
        }
        for(let i = 0; i < this.decor.length; i++)
        {
            this.decor[i].dispose();
        }
        this.objets = [];
        this.ennemis = [];
        this.decor = [];
        if (this.scene.navigationPlugin && this.scene.navigationPlugin.navmesh) {
            this.scene.navigationPlugin.navmesh.dispose(); // libère le mesh utilisé pour le pathfinding
            if(this.scene.navigationPlugin.crowd){
                const crowd = scene.navigationPlugin.crowd;
                const count = crowd.getAgents().length;
                for (let i = 0; i < count; i++) {
                    crowd.removeAgent(i);
                }
                scene.navigationPlugin.crowd = null;
            }
        }
    }


    getNumero()
    {
        return this.#numero;
    }

}