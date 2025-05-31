
export class Son
{
    static #musique = null;
    static #musiqueActif = true;
    static #sonMort = null;
    static #sonBonus = null;
    static #sonCauchemar = null;
    static #sonSortie = null;

    static async init() {

        const audioEngine = await BABYLON.CreateAudioEngineAsync();


        this.#musique = await BABYLON.CreateSoundAsync("musique", "assets/sounds/musique.mp3");
        this.#sonMort = await BABYLON.CreateSoundAsync("sonMort", "assets/sounds/mort.mp3");
        this.#sonBonus = await BABYLON.CreateSoundAsync("sonBonus", "assets/sounds/bonus.mp3");
        this.#sonCauchemar = await BABYLON.CreateSoundAsync("sonCauchemar", "assets/sounds/cauchemar.mp3");
        this.#sonSortie = await BABYLON.CreateSoundAsync("sonSortie", "assets/sounds/sortie.mp3");
        
        

        await audioEngine.unlockAsync();

        this.#musique.loop = true;
        this.activerMusique();

    }

    static activerMusique() {
        this.#musiqueActif = true;
        if (this.#musique) {
            this.#musique.play();
        }
    }

    static desactiverMusique() {
        this.#musiqueActif = false;
        if (this.#musique) {
            this.#musique.stop();
        }
    }

    static jouerSonMort() {
        if (this.#sonMort) {
            this.#sonMort.play();
        }
    }
    static jouerSonBonus() {
        if (this.#sonBonus) {
            this.#sonBonus.play();
        }
    }

    static jouerSonCauchemar() {
        if (this.#sonCauchemar) {
            this.#sonCauchemar.play();
        }
    }

    static jouerSonSortie() {
        if (this.#sonSortie) {
            this.#sonSortie.play();
        }
    }

    static async changerMusique(nouvelleMusique)
    {
        if (this.#musique) {
                try {
                    this.#musique.stop();
                    this.#musique.dispose();
                } catch (e) {
                    console.warn("Erreur lors de l'arrêt de la musique précédente :", e);
                }
            }
        await BABYLON.CreateSoundAsync("musique", "assets/sounds/"+nouvelleMusique).then((son) => {
            this.#musique = son;
            this.#musique.loop = true;
            this.activerMusique();
        });
    }
}