import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
       var config = {
        apiKey: "AIzaSyA_OPuokW4x8k0FOqrShMgsp8Brj18lULM",
        authDomain: "jta-instagram-clone-db8e1.firebaseapp.com",
        databaseURL: "https://jta-instagram-clone-db8e1.firebaseio.com",
        projectId: "jta-instagram-clone-db8e1",
        storageBucket: "jta-instagram-clone-db8e1.appspot.com",
        messagingSenderId: "740283784028"
      };


      firebase.initializeApp(config);
  }

}
