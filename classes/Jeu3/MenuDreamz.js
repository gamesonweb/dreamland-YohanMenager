import {Imenu} from "../Imenu.js";
import {GestionPoints} from "../GestionPoints.js";
import {Timer} from "../Timer.js";

export class MenuDreamz extends Imenu{

    constructor(chargeur)
    {
        super(chargeur, "dreamz");
    }

    async init()
    {
        console.log("Initialisation du menu...");
        this.ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("menu", true, this.chargeur.scene);
        this.menuContainer = new BABYLON.GUI.Rectangle("menuContainer");
        // this.menuContainer.isVertical = true;
        this.menuContainer.width = "1000px";
        this.menuContainer.height = "90%";
        this.menuContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.menuContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.menuContainer.zIndex = 1;

        
        this.menuContainer.cornerRadius = 20;
        this.menuContainer.thickness = 2;
        this.menuContainer.color = "white";
        this.menuContainer.background = "rgba(22, 0, 70, 0.75)"; // Fond transparent


        // StackPanel pour organiser les éléments du menu (dans le rectangle)
        this.layout = new BABYLON.GUI.StackPanel("layout");
        this.layout.isVertical = true;
        this.layout.width = 1;
        this.layout.height = 1;


        const boutonFermer = BABYLON.GUI.Button.CreateSimpleButton("fermer", "X");
        boutonFermer.width = "50px";
        boutonFermer.height = "50px";
        boutonFermer.color = "white";
        boutonFermer.background = "rgb(22, 0, 70)";
        boutonFermer.cornerRadius = 25;
        boutonFermer.thickness = 0;
        boutonFermer.fontSize = 25;
        boutonFermer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        boutonFermer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.layout.addControl(boutonFermer);
        boutonFermer.onPointerClickObservable.add(() => {
            Timer.setVitesse(1);
            this.cacherMenu();
            if(this.chargeur.niveau.getNumero() != 0)
            {
                this.chargeur.hud.afficher();
            }
            
        })

        for(let i = 1; i <= this.chargeur.nbNiveaux; i++)
        {
            const points = GestionPoints.getPointsParJeu(3)[i] || 0;
            const boutonNiveau = BABYLON.GUI.Button.CreateSimpleButton(`niveau${i}`, `Niveau ${i} - ${points} pts`);
            
            boutonNiveau.width = "300px";
            boutonNiveau.height = "50px";
            boutonNiveau.color = "black";
            boutonNiveau.fontSize = 25;
            boutonNiveau.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            boutonNiveau.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            boutonNiveau.top = `${(i)*60}px`;
            boutonNiveau.left = "-10px";
            boutonNiveau.paddingLeft = "10px";
            boutonNiveau.paddingTop = "10px";
            boutonNiveau.paddingRight = "10px";
            boutonNiveau.paddingBottom = "10px";
            boutonNiveau.textBlock.color = "rgb(22, 0, 70)";
            boutonNiveau.textBlock.fontSize = 25;
            if(i < this.niveauxDebloques)
            {
                boutonNiveau.background = "rgb(252, 255, 61)";
                boutonNiveau.onPointerClickObservable.add(() => {
                    this.demarrerNiveau(i);
                });
            }
            else if(i == this.niveauxDebloques)
            {
                boutonNiveau.background = "rgb(13, 90, 197)";
                boutonNiveau.onPointerClickObservable.add(() => {
                    this.demarrerNiveau(i);
                });
            }
            else
            {
                boutonNiveau.background = "gray";
                boutonNiveau.alpha = 0.5;
                boutonNiveau.isHitTestVisible = false;
            }
            this.layout.addControl(boutonNiveau);



            }

            //classement
            // Ajout du classement
            const classement = GestionPoints.getClassementParJeu(3);
            const titreClassement = new BABYLON.GUI.TextBlock();
            titreClassement.text = "Top 3 Joueurs - Dreamz";
            titreClassement.color = "white";
            titreClassement.fontSize = 28;
            titreClassement.height = "50px";
            titreClassement.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;   
            this.layout.addControl(titreClassement);

            for (let i = 0; i < classement.length; i++) {
                const [joueur, score] = classement[i];
                const ligne = new BABYLON.GUI.TextBlock();
                ligne.text = `${i + 1}. ${joueur} - ${score} pts`;
                ligne.color = "white";
                ligne.fontSize = 24;
                ligne.height = "40px";
                ligne.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT; 
                this.layout.addControl(ligne);
            }

            this.menuContainer.addControl(this.layout); 
            this.menuContainer.isVisible = false; // Le menu est caché au début
            this.ui.addControl(this.menuContainer);
        
        
        if(!this.chargeur.joueur)
            {
                await this.chargeur.initJoueur();
            }
        // this.afficherMenu();
        // this.demarrerNiveau(0);
    }

    afficherMenu()
    {
        this.ui.isVisible = true;
        this.menuContainer.isVisible = true;
        // console.log("Affichage du menu...");
        // for (let i = 1; i <= this.niveauxDebloques; i++) {
        //     console.log(`Niveau ${i} disponible`);
        // }
        // await this.demarrerNiveau(-1);//pour utiliser la zone de test
        // await this.demarrerNiveau(this.niveauxDebloques);//temporaire jusqu'à qu'il y ait un menu
    }

    cacherMenu()
    {
        this.ui.isVisible = false;
        this.menuContainer.isVisible = false;
        // console.log("Cacher le menu...");
    }

    async demarrerNiveau(niveau)
    {
        // console.log(`entrée méthode demarrerNiveau`);
        if (niveau <= this.niveauxDebloques) {
            console.log(`Chargement du niveau ${niveau}...`);
            this.cacherMenu();
            await this.chargeur.chargerNiveau(niveau);
        } else {
            console.log(`Niveau ${niveau} non débloqué !`);
        }
    }
    niveauTermine(numero)
    {
        console.log("Niveau terminé !");
        Timer.setVitesse(0);
        this.chargeur.hud.cacher();
        //gestion des points
        let pointsGagnes = this.chargeur.niveau.calculerScoreNiveau();
        if(pointsGagnes > GestionPoints.getPointsParJeu(3)[numero])
        {
            GestionPoints.setPointsNiveau(3, numero, pointsGagnes);
            for (let bouton of this.layout.children) {
                if (bouton.name === `niveau${numero}`) {
                    const points = GestionPoints.getPointsParJeu(3)[numero] || 0;
                    bouton.textBlock.text = `Niveau ${numero} - ${points} pts`;
                    break;
                }
            }
            GestionPoints.sauvegarder();

            // // Met à jour le classement
            // const nouveauClassement = GestionPoints.getClassementParJeu(3);

            // // Supprime les anciens blocs de classement s'ils existent
            // this.menuContainer.children = this.menuContainer.children.filter(control => {
            //     return !(control.name && control.name.startsWith("classement_"));
            // });

            // // Ajoute les nouveaux
            // for (let i = 0; i < nouveauClassement.length; i++) {
            //     const [joueur, score] = nouveauClassement[i];
            //     const ligne = new BABYLON.GUI.TextBlock(`classement_${i}`);
            //     ligne.text = `${i + 1}. ${joueur} - ${score} pts`;
            //     ligne.color = "white";
            //     ligne.fontSize = 24;
            //     ligne.height = "40px";
            //     ligne.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            //     ligne.name = `classement_${i}`;
            //     this.menuContainer.addControl(ligne);
            // }
        

        }

        //pour gérer si on débloque le niveau suivant ou pas
        if(numero==this.niveauxDebloques)
        {
            for(let bouton of this.layout.children)
            {
                if(bouton.name == `niveau${numero+1}`)
                {
                    bouton.background = "rgb(13, 90, 197)";
                    bouton.alpha = 1;
                    bouton.isHitTestVisible = true;
                    bouton.onPointerClickObservable.add(() => {
                        this.demarrerNiveau(numero+1);
                    });
                }
                if(bouton.name == `niveau${numero}`)
                    {
                        bouton.background = "rgb(252, 255, 61)";
                        // bouton.alpha = 1;
                        // bouton.isHitTestVisible = true;
                        // bouton.onPointerClickObservable.add(() => {
                        //     this.demarrerNiveau(numero+1);
                        // });
                    }
            }
            this.debloquerNiveau();
            
        }

        this.afficherMenu();
    }
}