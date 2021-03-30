import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    TOKEN_HEADER_KEY = 'Authorization';

    constructor(private tokenService: TokenStorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest = request;
        const token = this.tokenService.getToken();
        if (token != null) {
            authRequest = request.clone({ headers: request.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + token)});
        }
        return next.handle(authRequest);
    }
}

export const authInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];