/**
 * Classe Plateforme
 * représente le sol et le décor
 */
export class Plateforme
{
    static numero = 0;

    /**
     * 
     * @param {*} largeur largeur de la plateforme
     * @param {*} longueur longueur de la plateforme
     * @param {*} hauteur hauteur de la plateforme
     * @param {*} positionX position en X
     * @param {*} positionZ position en Z
     * @param {*} texture texture de la plateforme
     * @param {*} normalMap carte de normales pour le relief
     * @param {*} scene scène où afficher la plateforme
     * @param {*} relief hauteur du relief pour la normalMap
     */
    constructor(largeur, longueur, hauteur, positionX, positionY, positionZ, texture, textureCote, normalMap, normalMapCote, scene, relief, opacity, defilement = false)
    {
        //debug
        // console.log("plateforme numéro ", Plateforme.numero)
        // console.log("Texture URL:", texture);
        // console.log("TextureCote URL:", textureCote);
        // console.log("NormalMap URL:", normalMap);
        // console.log("NormalMapCote URL:", normalMapCote);

        this.largeur = largeur;
        this.longueur = longueur;

        this.scene = scene;

       

        this.mesh = BABYLON.MeshBuilder.CreateBox(
            "plateforme_"+Plateforme.numero, 
            { width: largeur, 
                height: hauteur, 
                depth: longueur, 
                }, 
                scene);
        
        const multimat = new BABYLON.MultiMaterial("multi", scene);
        // const materiau = new BABYLON.StandardMaterial("materiau", scene);
        const materiauFace = new BABYLON.StandardMaterial("materiauFace", scene);
        const materiauCote = new BABYLON.StandardMaterial("materiauCote", scene);
        const materiauHaut = new BABYLON.StandardMaterial("materiauHaut", scene)

        materiauFace.alpha = opacity;
        materiauCote.alpha = opacity;
        materiauHaut.alpha = opacity;

        if(texture != null)
        {
            materiauHaut.diffuseTexture = new BABYLON.Texture(texture, scene);
            materiauHaut.diffuseTexture.uScale = longueur/20; // Nombre de répétitions en largeur
            materiauHaut.diffuseTexture.vScale = largeur/20; // Nombre de répétitions en hauteur

        }
        else{
            materiauHaut.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.9);
            materiauHaut.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);  
        }
        if(textureCote != null)
        {
            materiauCote.diffuseTexture = new BABYLON.Texture(textureCote, scene)
            materiauCote.diffuseTexture.uScale = hauteur/10;
            materiauCote.diffuseTexture.vScale = longueur/10;

            materiauFace.diffuseTexture = new BABYLON.Texture(textureCote, scene)
            materiauFace.diffuseTexture.uScale = largeur/10;
            materiauFace.diffuseTexture.vScale = hauteur/10;            
        }
        else
        {
            materiauCote.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.9);
            materiauCote.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);              
        }


        if(normalMap != null)
        {
            materiauHaut.bumpTexture = new BABYLON.Texture(normalMap, scene);  
            materiauHaut.bumpTexture.uScale =  longueur/20; // Nombre de répétitions en longueur
            materiauHaut.bumpTexture.vScale =  largeur/20; // Nombre de répétitions en largeur
            materiauHaut.bumpTexture.level = relief; // Augmente l'effet de relief


            materiauHaut.diffuseColor = new BABYLON.Color3(1, 1, 1);
            materiauHaut.emissiveColor = new BABYLON.Color3(1, 1, 1);

        }
        if(normalMapCote != null)
        {
            materiauCote.bumpTexture = new BABYLON.Texture(normalMap, scene);  
            materiauCote.bumpTexture.uScale =  longueur/10; // Nombre de répétitions en largeur
            materiauCote.bumpTexture.vScale =  hauteur/10; // Nombre de répétitions en hauteur
            materiauCote.bumpTexture.level = relief; // Augmente l'effet de relief    
            
            materiauFace.bumpTexture = new BABYLON.Texture(normalMap, scene);  
            materiauFace.bumpTexture.uScale =  largeur/10; // Nombre de répétitions en longueur
            materiauFace.bumpTexture.vScale =  hauteur/10; // Nombre de répétitions en hauteur
            materiauFace.bumpTexture.level = relief; // Augmente l'effet de relief 

            materiauCote.diffuseColor = new BABYLON.Color3(1, 1, 1);
            materiauCote.emissiveColor = new BABYLON.Color3(1, 1, 1);
            materiauFace.diffuseColor = new BABYLON.Color3(1, 1, 1);
            materiauFace.emissiveColor = new BABYLON.Color3(1, 1, 1);          
        }


        if(defilement)
        {
            materiauHaut.diffuseTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
            materiauHaut.diffuseTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
            
            materiauFace.diffuseTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
            materiauFace.diffuseTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
            this.scene.onBeforeRenderObservable.add(() => {
                this.mesh.material.subMaterials[0].diffuseTexture.uOffset -= 0.01;
                this.mesh.material.subMaterials[2].diffuseTexture.vOffset += 0.005;
            });
        }



        multimat.subMaterials.push(materiauFace);
        multimat.subMaterials.push(materiauCote);
        multimat.subMaterials.push(materiauHaut);



        this.mesh.material = multimat;

        //assigner des subMeshs aux différentes faces
        this.mesh.subMeshes = [];
        const verticesCount = this.mesh.getTotalVertices();

        //haut de la plateforme
        this.mesh.subMeshes.push(new BABYLON.SubMesh(0, 0, verticesCount, 0, 6, this.mesh));
        this.mesh.subMeshes.push(new BABYLON.SubMesh(0, 0, verticesCount, 6, 6, this.mesh));

        //côtés
        this.mesh.subMeshes.push(new BABYLON.SubMesh(1, 0, verticesCount, 12, 6, this.mesh));
        this.mesh.subMeshes.push(new BABYLON.SubMesh(1, 0, verticesCount, 18, 6, this.mesh));
    
        //faces avant et arrière
        this.mesh.subMeshes.push(new BABYLON.SubMesh(2, 0, verticesCount, 24, 6, this.mesh));
        this.mesh.subMeshes.push(new BABYLON.SubMesh(2, 0, verticesCount, 30, 6, this.mesh));
    

        this.mesh.position.set(positionX, positionY, positionZ);
        this.mesh.checkCollisions = true;

        Plateforme.numero++;
        
    }

    dispose()
    {
        this.mesh.dispose();
    }
    
    createInstance(name, x, y, z) {
        let instance = this.mesh.createInstance(name);
        instance.checkCollisions = this.mesh.checkCollisions;
        instance.metadata = this.mesh.metadata;
        instance.position = new BABYLON.Vector3(x, y, z);
        return instance;
    }

static Ascenseur(x, z, yBas, yHaut, scene) {
    // Création de la plateforme ascenseur
    const plateforme = new Plateforme(
        20, 20, 2,                         // largeur, profondeur, hauteur
        20 * x, yBas, -20 * z,            // position
        "/assets/textures/texture1.jpg", // texture dessus
        "/assets/textures/texture1.jpg",     // texture côté
        "/assets/textures/normalMap1.jpg", "/assets/textures/normalMap1.jpg",
        scene,
        10, 1.0
    );

    plateforme.mesh.metadata = { type: "Sol" };

    let direction = 1;
    const vitesse = 0.5;
    const epsilon = 0.5;

    let joueurSurPlateforme = null;
    let enPause = false;
    let timerPause = 0;
    const dureePause = 2000; // en millisecondes

    scene.onBeforeRenderObservable.add(() => {
        const yActuel = plateforme.mesh.position.y;
        const yCible = direction > 0 ? yHaut : yBas;
        const delta = yCible - yActuel;

        // Pause si on est arrivé à une extrémité
        if (enPause) {
            const maintenant = Date.now();
            if (maintenant - timerPause >= dureePause) {
                enPause = false;
                direction *= -1;
            }
            // Rien d’autre à faire pendant la pause
            return;
        }

        // Mouvement de la plateforme
        if (Math.abs(delta) > epsilon) {
            const dy = direction * vitesse;
            plateforme.mesh.position.y += dy;

            // Déplacer le joueur avec la plateforme s'il est dessus
            if (joueurSurPlateforme && joueurSurPlateforme.hitbox) {
                joueurSurPlateforme.hitbox.position.y += dy;
            }
        } else {
            // Arrivé en haut ou en bas -> pause
            plateforme.mesh.position.y = yCible;
            enPause = true;
            timerPause = Date.now();
        }

        // Vérifier si un joueur est sur la plateforme
        for (const mesh of scene.meshes) {
            if (
                mesh.metadata &&
                mesh.metadata.type === "Joueur" &&
                mesh.intersectsMesh(plateforme.mesh, false)
            ) {
                joueurSurPlateforme = mesh.metadata.instance;
                break;
            } else if (
                joueurSurPlateforme &&
                !joueurSurPlateforme.hitbox.intersectsMesh(plateforme.mesh, false)
            ) {
                joueurSurPlateforme = null; // Le joueur a quitté la plateforme
            }
        }
    });

    return plateforme;
}




}