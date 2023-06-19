import { Injectable } from '@angular/core';
import * as firebase from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string){
    return new Promise<void>(
      (resolve, reject) => {
        firebase.createUserWithEmailAndPassword(firebase.getAuth(), email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  signInUser(email: string, password: string){
    return new Promise<void>(
      (resolve, reject) => {
        firebase.signInWithEmailAndPassword(firebase.getAuth(), email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  signOutUser() {
    firebase.signOut(firebase.getAuth());
  }
}
