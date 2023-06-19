import { Component } from '@angular/core';
import * as firebase from "firebase/app"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyCK1SBJN31T2mabDy5nm76C4c8k-ajzCVU",
      authDomain: "learningangularhttpclientdemo.firebaseapp.com",
      databaseURL: "https://learningangularhttpclientdemo-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "learningangularhttpclientdemo",
      storageBucket: "learningangularhttpclientdemo.appspot.com",
      messagingSenderId: "186557765993",
      appId: "1:186557765993:web:ec6b29fa714887441a05f8",
      measurementId: "G-MKFDHMVE2S"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
