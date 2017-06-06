import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { IUser } from './user.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
    currentUser: IUser;

    constructor(private http: Http) {

    }

    loginUser(userName: string, password: string) {
        let headers = new Headers(
            { 'Content-Type': 'application/json' }
        );
        let options = new RequestOptions({ headers: headers });
        let loginInfo = { username: userName, password: password };
        return this.http.post('/api/login', JSON.stringify(loginInfo), options)
            .do(response => {
                if (response) {
                    this.currentUser = <IUser>response.json().user;
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
    }
}