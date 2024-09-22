import { Component, OnInit } from '@angular/core';
import { voyage } from './model/voyage.model';
import { voyageService } from './services/voyage.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

// import { voyage } from '../model/voyage.model';
// import { AuthService } from '../services/auth.service';
// import { voyageService } from '../services/voyage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
})
export class AppComponent {
  title = 'EquipesProject';

  constructor(public authService: AuthService,
    private router :Router){}

ngOnInit() {
let isloggedin: string;
let loggedUser: string;
isloggedin = localStorage.getItem('isloggedIn')!;
loggedUser = localStorage.getItem('loggedUser')!;
if (isloggedin != "true" || !loggedUser)
this.router.navigate(['/login']);
else
this.authService.setLoggedUserFromLocalStorage(loggedUser);
}

onLogout(){
this.authService.logout();
}
}