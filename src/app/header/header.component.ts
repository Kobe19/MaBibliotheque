import {Component, Injectable, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import * as firebase from "firebase/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit{

  isAuth: boolean;
  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    firebase.onAuthStateChanged(
     firebase.getAuth(),
      (user) => {
        if(user) {
          this.isAuth = true;
        }else{
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }
}
