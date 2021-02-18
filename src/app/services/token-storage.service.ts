import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  USER_KEY = 'auth-user';

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
}
