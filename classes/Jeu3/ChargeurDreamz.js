import { Ichargeur } from '../Ichargeur.js';
import { lvl_1 } from './Niveaux/lvl_1.js';
import { lvl_2 } from './Niveaux/lvl_2.js';
import { lvl_3 } from './Niveaux/lvl_3.js';
import { lvl_4 } from './Niveaux/lvl_4.js';
import { zoneTest } from './Niveaux/zoneTest.js';
import { Accueil } from './Niveaux/Accueil.js';
import { Personnage } from "./Personnage.js";
import { HUD } from './HUD.js';
import { Timer } from '../Timer.js';
import { GestionPoints } from '../GestionPoints.js';
import { Son } from './Son.js';

export class ChargeurDreamz extends Ichargeur {
    scene;
    niveau;
    joueur;
    hud;
    nbNiveaux = 4; // Nombre total de niveaux disponibles
    constructor(scene) {
        super();
        this.scene = scene;
        this.hud = new HUD(scene);
        this.hud.cacher();
        
    }

    async initJoueur() {
        this.joueur = new Personnage(this.scene);
        await this.joueur.init();
    }

    async chargerNiveau(niveau) {
        Timer.stopTimer();
        GestionPoints.resetPoints();
        this.hud.reset(niveau);
        
        // console.log(`entrée méthode chargerNiveau`);
        //effacer le niveau d'avant pour éviter les fuites de mémoire
        //si la méthode est appelée pour la première fois, on évite les erreurs en vérifiant si le niveau existe
        if (this.niveau) {
            this.niveau.supprimer();
        }
        switch (niveau) {
            case -1:
                this.niveau = new zoneTest(this.scene);
                break;
            case 0:
                this.niveau = new Accueil(this.scene);
                break;
            case 1:
                this.niveau = new lvl_1(this.scene);
                console.log("Niveau 1");
                break;
            case 2:
                this.niveau = new lvl_2(this.scene);
                console.log("Niveau 2");
                this.hud.afficherTexte("Trouvez les clés, mais attention aux cauchemars !", 5000);
                break;
            case 3:
                this.niveau = new lvl_3(this.scene);
                console.log("Niveau 3");
                break;
            case 4:
                this.niveau = new lvl_4(this.scene);
                console.log("Niveau 4");
                this.hud.afficherTexte("Trouvez l'ascenseur pour monter !", 5000);
                break;
            default:
                console.error("Niveau non reconnu !");
                this.niveau = new Accueil(this.scene);
                break;
        }
        if(this.niveau)
        {
            this.joueur.hitbox.position = this.niveau.positionDepart;

            if(this.niveau.getNumero() == 0)
            {
                this.hud.cacher();
                this.joueur.peutMarcher = false;                
                
                this.joueur.walk.start(true);
                this.joueur.idle.stop();

                
                //faire tourner le joueur de 90 degrés
                this.joueur.mesh.rotationQuaternion = BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, -1, 0), Math.PI/2);

                this.camera = this.scene.activeCamera;
                if(this.camera)
                {
                    this.camera.target = this.joueur.hitbox.position;
                    this.camera.alpha = 5*Math.PI/4;
                    this.camera.beta = Math.PI/4;
                    this.camera.radius = 25;                     
                }

            }
            else
            {
                this.hud.afficher();
                this.joueur.peutMarcher = true;

                this.joueur.idle.start(true);
                this.joueur.walk.stop();
                
                this.camera = this.scene.activeCamera;
                this.camera.target = this.joueur.hitbox.position;
                this.camera.alpha = -Math.PI/2;
                this.camera.beta = Math.PI/6;
                this.camera.radius = 50;        
            }

            for (const ennemi of this.niveau.ennemis) 
                {
                    // console.log(ennemi);
                    await ennemi.init();
                    // await ennemi.init();
                    ennemi.hitbox.onCollideObservable.add((otherMesh) => {
                        console.log("Collision avec l'ennemi !");
                        if (otherMesh.metadata?.type === "Joueur")
                        {
                            this.mort();
                        }
                    });
                    
                }
            for (const objet of this.niveau.objets)
            {
                if (objet.nomModele != null) {
                    setTimeout(async () => {
                        await objet.init();
                    }, 0);
                }
            }
        }
        else
        {
            console.error("Niveau non reconnu !");
        }
        Timer.startTimer();

        Timer.setVitesse(1);
    }

    mort()
    {
        Son.jouerSonMort();
        console.log("Mort du joueur !");
        this.chargerNiveau(this.niveau.getNumero());
        this.camera = this.scene.activeCamera;
        this.camera.target = this.joueur.hitbox.position;
        this.camera.alpha = -Math.PI/2;
        this.camera.beta = Math.PI / 6;
        this.camera.radius = 50;
    }
}