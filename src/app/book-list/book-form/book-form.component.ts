import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {Book} from "../../models/Book.model";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit{

  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private bookService: BooksService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    })
  }

  onSaveBook(){
    const title = this.bookForm.get('title')?.value;
    const author = this.bookForm.get('author')?.value;
    const newBook = new Book(title, author);
    this.bookService.createNewBook(newBook);
    this.router.navigate(['/book']);
  }



}
