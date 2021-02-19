import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = 'APP';
  nombreUsuario: string;

  constructor(private authService: AuthService,
              private storage: TokenStorageService,
              private router: Router) {}

  ngOnInit() {
    const personaLogueada = this.storage.getUser();
    this.nombreUsuario = personaLogueada.nombre;  
  }

  public logout() {
    this.authService.logout().subscribe(data => {
      this.storage.signOut();
      window.location.reload();
      this.router.navigate(['/login']);
    });
  }
}
