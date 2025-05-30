import Cookie from "./cookie.js";
import Grille from "./grille.js";

// 1 On définisse une sorte de "programme principal"
// le point d'entrée du code qui sera appelée dès que la
// page ET SES RESSOURCES est chargée

window.onload = init;

let grille;

function init() {
  console.log("Page et ressources prêtes à l'emploi");
  // appelée quand la page et ses ressources sont prêtes.
  // On dit aussi que le DOM est ready (en fait un peu plus...)

  grille = new Grille(9, 9);
  grille.updateGrilleDebut();
  let b = document.querySelector("#buttonTestAlignement");
  b.onclick = () => {
    let existeAlignement = grille.testAlignementDansTouteLaGrille();

    console.log("Existe Alignement : " + existeAlignement)
  }

}
