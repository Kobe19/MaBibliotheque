import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Book} from "../models/Book.model";
import {HttpClient} from "@angular/common/http";
import * as firebase from "firebase/database";
import * as firebase2 from "firebase/storage";
import {uploadBytesResumable} from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  bookSubject = new Subject<any[]>();
  private books : Book[] = [];

  constructor(private httpClient:HttpClient) { }

  emitBooks() {
    this.bookSubject.next(this.books.slice());
  }

  saveBooks() {
    firebase.set(
      firebase.ref(firebase.getDatabase(), '/books'),
      this.books);
  }

  getBooks() {
    const dbRef = firebase.query(firebase.ref(firebase.getDatabase(), '/books'))
    firebase.onValue( dbRef , (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    })
  }

  getSingleBooks(id: number){
    return new Promise(
      (resolve, reject) => {
        const dbRef = firebase.ref(firebase.getDatabase())
        firebase.get(firebase.child(dbRef, `/books/`+ id)).then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book){
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book){
         return true
        }else{
          return false
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const storage = firebase2.getStorage()
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase2.ref(firebase2.getStorage(), 'images/' + almostUniqueFileName + file.name);
        const test = uploadBytesResumable(upload, file);

        test.on('state_changed',
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de chargement : '+ error);
            reject();
          },
          () => {
            firebase2.getDownloadURL(test.snapshot.ref).then(
              (downloadUrl) => {
                resolve(downloadUrl);
              }
            )
          }
        )
      }
    )
  }


}
