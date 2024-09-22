import { Component, OnInit } from '@angular/core';
import { voyage } from '../model/voyage.model';
import { voyageService } from '../services/voyage.service';
import { Categorie } from '../model/categorie.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-voyage',
  templateUrl: './add-voyage.component.html'
})
export class AddVoyageComponent implements OnInit {
  newvoyage = new voyage();

  message : string = "";
  categories!: Categorie[];
newIdCat: any;
  constructor(private voyageservice : voyageService,private router :Router) { }



  ngOnInit(): void { this.voyageservice.listeCategories(). subscribe(cats => {console.log(cats); this.categories = cats._embedded.categories; }); }
  addvoyage(){ this.newvoyage.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!; this.voyageservice.ajoutervoyage(this.newvoyage) .subscribe(voy => { console.log(voy); this.router.navigate(['voyages']); }); }
    
    

}
