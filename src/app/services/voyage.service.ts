import { Injectable } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { voyage } from '../model/voyage.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../model/CategorieWrapped';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class voyageService {

  apiURL: string = 'http://localhost:8090/voyages/api';  // Updated to match Spring Boot controller
  apiURLCat: string = 'http://localhost:8090/voyages/api/cat';  // Category endpoint

  voyages: voyage[] = [];  // Array of voyages

  constructor(private http: HttpClient) {
    // Initialize with some example data (can be removed later)
    this.voyages = [
     
    ];
  }

  // Get all voyages
  listevoyage(): Observable<voyage[]> {
    return this.http.get<voyage[]>(this.apiURL);
  }

  // Add a new voyage
  ajoutervoyage(voyage: voyage): Observable<voyage> {
    return this.http.post<voyage>(`${this.apiURL}`, voyage, httpOptions);
  }

  // Delete a voyage by ID
  supprimervoyage(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }

  // Get a specific voyage by ID
  consultervoyage(id: number): Observable<voyage> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<voyage>(url);
  }

  // Sort voyages by ID
  triervoyages() {
    this.voyages = this.voyages.sort((n1, n2) => {
      return n1.idvoyage > n2.idvoyage ? 1 : n1.idvoyage < n2.idvoyage ? -1 : 0;
    });
  }

  // Update an existing voyage
  updatevoyage(voyage: voyage): Observable<voyage> {
    return this.http.put<voyage>(`${this.apiURL}`, voyage);

  }

  // Get list of categories
  listeCategories(): Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(this.apiURLCat);
  }

  // Search voyages by category ID
  rechercherParCategorie(idCat: number): Observable<voyage[]> {
    const url = `${this.apiURL}/voyagescat/${idCat}`;  // Corrected URL
    return this.http.get<voyage[]>(url);
  }

  // Search voyages by name
  rechercherParNom(nom: string): Observable<voyage[]> {
    const url = `${this.apiURL}/voysByName/${nom}`;  // Corrected URL
    return this.http.get<voyage[]>(url);
  }

  // Add a new category
  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }
}
