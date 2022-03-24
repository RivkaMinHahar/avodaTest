import { Component, OnInit,Injectable } from '@angular/core';
import { book } from '../models/book';
import {BookService} from '../services/book.service';
import { MatTableDataSource } from '@angular/material/table';
import { compileDeclareDirectiveFromMetadata } from '@angular/compiler';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  matDataSource: MatTableDataSource<book> ;
  displayedColumns : string[]|undefined;
  selectedRow:book|undefined;
  isSelectedRow:boolean=false;
  isOpenDiv:boolean=false;
  isAdd:boolean=false;
  isEdit:boolean=false;
  isDelete:boolean=false;
  bookDiv:book =new book();
  constructor(private bookService:BookService ) {
    this.matDataSource=new MatTableDataSource();
    this.getBooks();
    this.displayedColumns = ['Id', 'Name', 'Description', 'Price'];
   
   }

  ngOnInit(): void {
  }
  getBooks() {
     this.bookService.GetAllBooks().subscribe(
      data => {
      this.matDataSource.data=data;
      });
} 
insertBooks(b:book) {
  this.bookService.InsertBook(b).subscribe(
    data => {
    console.log("insertBooks: "+data)
    });
}
editBook(b:book){
 
  this.bookService.EditBook(b).subscribe(
    data => {
    console.log("insertBooks: "+data)
    });
}
deleteBook(id:number){
  this.bookService.DeleteBook(id).subscribe(
    data => {
    console.log("insertBooks: "+data)
    });
}
getBook(SymbolRow: book) {
  this.selectedRow = SymbolRow;
 this.isSelectedRow=true;
}
Add(){
  this.isOpenDiv=true;
  this.isAdd=true;
}
Edit(){
  this.isOpenDiv=true;
  this.isEdit=true;
  this.SetSelectedRow();
}
Delete(){
  this.isDelete=true;
  this.save();
}
SetSelectedRow(){
  if(this.selectedRow){
  this.bookDiv.description=this.selectedRow?.description;
  this.bookDiv.name=this.selectedRow?.name;
  this.bookDiv.id=this.selectedRow?.id ;
  this.bookDiv.price=this.selectedRow?.price;
  }
}
save(){
  if(this.bookDiv)
  {
    if(this.bookDiv.description!="" && this.bookDiv.price!=0&& this.bookDiv.name!="")
    {
      if(this.isAdd){
      this.insertBooks(this.bookDiv);
      this.ClearDiv();
      this.getBooks();
      }
     else if(this.isEdit){
        this.editBook(this.bookDiv);
        this.ClearDiv();
        this.getBooks();
        }
        
    }
    else if(this.selectedRow){
      if(this.isDelete){
        if(this.selectedRow.id){
         this.deleteBook(this.selectedRow.id);
         this.getBooks();
         this.isDelete=false;
        }
       }
    }
    else{
      console.log("fill all properties!")
    }
  }
  
}
ClearDiv(){
  this.bookDiv.description="";
  this.bookDiv.name="";
  this.bookDiv.id=undefined;
  this.bookDiv.price=undefined;
  this.isAdd=false;
  this.isEdit=false;
  this.isOpenDiv=false;
}
}




