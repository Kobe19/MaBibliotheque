import {Component, OnInit} from '@angular/core';
import {Book} from "../../models/Book.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit{
  book: Book;
  constructor(private route: ActivatedRoute,
              private serviceBook: BooksService,
              private router: Router) {
  }
  ngOnInit(): void {

    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.serviceBook.getSingleBooks(+id).then(
      (book: Book | any) => {
        this.book = book;
      }
    )
  }

  onBack() {
    this.router.navigate(['/books']);
  }

}
