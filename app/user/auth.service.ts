import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from '@angular/http';
import { IUser } from './user.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    currentUser: IUser;

    constructor(private http: Http) {

    }

    loginUser(userName: string, password: string) {
        const headers = new Headers(
            { 'Content-Type': 'application/json' },
        );
        const options = new RequestOptions({ headers });
        const loginInfo = { username: userName, password };
        return this.http.post('/api/login', JSON.stringify(loginInfo), options)
            .do(response => {
                if (response) {
                    this.currentUser = response.json().user as IUser;
                }
            }).catch(error => {
                return Observable.of(false);
            });
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        const headers = new Headers(
            { 'Content-Type': 'application/json' },
        );
        const options = new RequestOptions({ headers });
        return this.http.put(`/api/users/${this.currentUser.id}`,
            JSON.stringify(this.currentUser), options);
    }

    checkAuthenticationStatus() {
        return this.http.get('/api/currentIdentity')
            .map((response: any) => {
                if (response._body) {
                    return response.json();
                } else {
                    return {};
                }
            })
            .do(currentUser => {
                if (!!currentUser.userName) {
                    this.currentUser = currentUser;
                }
            })
            .subscribe();
    }

    logout() {
        this.currentUser = undefined;
        const headers = new Headers(
            { 'Content-Type': 'application/json' },
        );
        const options = new RequestOptions({ headers });
        return this.http.post(`/api/logout`, JSON.stringify({}), options);
    }
}
