import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  USER_KEY = 'auth-user';
  TOKEN_KEY = 'auth-token';

  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  saveUser(user): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem(this.USER_KEY));
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
}
