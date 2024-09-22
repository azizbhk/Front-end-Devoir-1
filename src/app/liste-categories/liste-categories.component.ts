import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { voyageService } from '../services/voyage.service';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styles: [
  ]
})
export class ListeCategoriesComponent implements OnInit {

  categories!: Categorie[];

  ajout:boolean=true;


  updatedCat:Categorie = {"idCat":0,"nomCat":""};

  
  constructor(private voyageService: voyageService) { }

  ngOnInit(): void {
    
    this.chargerCategories();
  }


  chargerCategories() {
    this.voyageService.listeCategories().
      subscribe(cats => {this.categories = cats._embedded.categories;
      console.log(cats);
      });

  }

  categorieUpdated(cat:Categorie) {
    console.log("catégorie reçue du composant updateCAtegorie ",cat);
    this.voyageService.ajouterCategorie(cat).subscribe( ()=> this.chargerCategories());


  }

  updateCat(cat :Categorie)
  {
    this.updatedCat = cat;
    this.ajout=false;
  }

}