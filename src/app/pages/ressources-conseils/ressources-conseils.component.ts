import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ressources-conseils',

  templateUrl: './ressources-conseils.component.html',
  styleUrl: './ressources-conseils.component.scss'
})
export class RessourcesConseilsComponent implements OnInit {

  conseilsEntretien = [
    {
      title: 'Préparer ses réponses aux questions fréquentes',
      description: 'Anticipez les questions classiques des recruteurs et préparez des réponses adaptées.',
      link: 'https://www.michaelpageafrica.com/fr/advice/candidats/r%C3%A9ussir-votre-entretien-d%27embauche/les-dix-questions-les-plus-fr%C3%A9quentes-en#:~:text=Il%20est%20donc%20judicieux%20d,r%C3%A9ponse%20avant%20de%20vous%20lancer.'
    },
    {
      title: 'Les 10 erreurs à éviter en entretien',
      description: 'Découvrez les erreurs les plus fréquentes et comment les éviter pour réussir vos entretiens.',
      link: 'https://www.fed-group.fr/fed-group/conseils-embauche/entretien-d-embauche-top-10-des-erreurs-a-eviter'
    },
    {
      title: 'Comment bien se présenter en entretien',
      description: 'Apprenez à structurer votre présentation personnelle pour marquer l\'esprit du recruteur.',
      link: 'https://www.jobteaser.com/fr/advices/180-3-etapes-pour-se-presenter-en-3-minutes-en-entretien'
    }
  ];

  modelesCvLettre = [
    {
      title: 'Modèle de CV classique',
      link: 'https://www.modeles-de-cv.com/exemple-cv-classique/'
    },
    {
      title: 'Modèle de CV créatif',
      link: 'https://enhancv.com/blog/cv-creatif/'
    },
    {
      title: 'Modèle de lettre de motivation simple',
      link: 'https://emploi.lefigaro.fr/recherche-d-emploi/guide-de-la-recherche-d-emploi/535-lettre-de-motivation-exemple-gratuit-et-conseils/'
    },
    {
      title: 'Modèle de lettre de motivation original',
      link: 'https://www.cadremploi.fr/editorial/conseils/lettre-de-motivation/exemples-de-lettres-de-motivation-originales-et-accrocheuses'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}