import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { User } from "firebase";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    routRedirectUrl: string;

    constructor(
        private firebaseAuth: AngularFireAuth,
    ) {
    }

    get currentUser(): User | null {
        return this.firebaseAuth.auth.currentUser;
    }

    public get authState$() {
        return this.firebaseAuth.authState;
    }

    signIn(email: string, password: string, rememberMe: boolean): Promise<string | void> {
        return new Promise((resolve, reject) => {
            this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    if (rememberMe) {
                        resolve();
                    } else {
                        this.firebaseAuth.auth.setPersistence('session')
                            .then(() => resolve());
                    }
                }).catch(error => reject(error))
        })
    }

    signUp(data): Promise<void> {
        return new Promise(resolve => {
            this.firebaseAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
                .then(result => {
                    this.firebaseAuth.auth.currentUser.sendEmailVerification();
                    result.user.updateProfile({
                        displayName: data.fullName,
                        photoURL: 'EMPTY_USER_IMG'
                    });
                    this.signOut();
                    resolve();
                })
        })
    }

    signOut(): Promise<void> {
        return this.firebaseAuth.auth.signOut();
    }

    resetPassword(email: string): Promise<void> {
        return this.firebaseAuth.auth.sendPasswordResetEmail(email);
    }
}
