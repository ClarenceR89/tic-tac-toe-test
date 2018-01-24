import { Injectable } from '@angular/core';
import { User } from './api-client/models/user.model';

@Injectable()
export class AppService {
    user: User;

    constructor() { }

    getUser(): User {
        return this.user;
    }
    
    setUser(user: User) {
        this.user = user;
    }
}