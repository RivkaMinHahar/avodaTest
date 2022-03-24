import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-book',
  templateUrl: './get-book.component.html',
  styleUrls: ['./get-book.component.scss']
})
export class GetBookComponent implements OnInit {
  isHidden:boolean=false;
  
  constructor() { }

  ngOnInit(): void {
  }
  getBooks(){
    this.isHidden=true;
 
  }
}
