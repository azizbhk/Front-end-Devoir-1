import { Component, OnInit } from '@angular/core';
import { voyage } from '../model/voyage.model';
import { Categorie } from '../model/categorie.model';
import { voyageService } from '../services/voyage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html',
})
export class RechercheParCategorieComponent implements OnInit {
  voyages!: voyage[];
  IdCategorie!: number;
  categories!: Categorie[];

  constructor(private voyageService: voyageService) {}

  ngOnInit(): void {
    this.voyageService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
      console.log(cats);
    });
  }

  onChange() {
    this.voyageService.rechercherParCategorie(this.IdCategorie).
      subscribe(voys =>{this.voyages=voys});
    
    }
  }

