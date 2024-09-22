import { Component, OnInit } from '@angular/core';
import { voyageService } from '../services/voyage.service';
import { voyage } from '../model/voyage.model';
import { ActivatedRoute,Router } from '@angular/router';
import { Categorie } from '../model/categorie.model';
import { CategorieWrapper } from '../model/CategorieWrapped';

@Component({
  selector: 'app-update-voyage',
  templateUrl: './update-voyage.component.html',

})
export class UpdateVoyageComponent implements OnInit {
  currentvoyage = new voyage();
  categories! : Categorie[];
  updatedCatId! : number;


   constructor(private activatedRoute: ActivatedRoute, private voyageService: voyageService , private router: Router) { } 
   //console.log(this.activatedRoute.snapshot.params['id']);
   ngOnInit(): void { this.voyageService.listeCategories(). subscribe(cats => {console.log(cats); this.categories = cats._embedded.categories; } ); this.voyageService.consultervoyage(this.activatedRoute.snapshot.params['id']). subscribe( prod =>{ this.currentvoyage = prod; this.updatedCatId = this.currentvoyage.categorie.idCat; } )
    
    this.voyageService.consultervoyage(this.activatedRoute.snapshot.params['id']). subscribe( prod =>{ this.currentvoyage = prod; this.updatedCatId = this.currentvoyage.categorie.idCat; } ) ; }    
   updatevoyage() { this.currentvoyage.categorie = this.categories. find(cat => cat.idCat == this.updatedCatId)!; this.voyageService.updatevoyage(this.currentvoyage).subscribe(prod => { this.router.navigate(['voyages']); } ); }

}
