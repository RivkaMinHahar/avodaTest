import { Injectable } from '@angular/core';
import { book } from '../models/book';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders ,HttpParams} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { environment } from 'src/environments/environment';
import { catchError , map} from 'rxjs/operators';
import { throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class BookService {
  Url: string="";
 books:book[] | undefined;
  headers: HttpHeaders | undefined;
  params:HttpParams | undefined;
  postParams:book | undefined;
  listRet:Observable<book[]> | undefined;
 


  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
     })
     this.Url = environment.apiURL
  }
 
  GetAllBooks():Observable<book[]>
  {    
     return this.http.get<book[]>(this.Url ,{ headers: this.headers}).pipe(
      catchError((err) => {
        console.log("GetBook:"+err);
       return throwError(()=>err);
      }));
  } 
  GetBookById(id:number):Observable<book[]>
  {    
     return this.http.get<book[]>(this.Url+id,{ headers: this.headers});   
  } 
  DeleteBook(id:number)
  {    
    return  this.http.delete(this.Url+id,{ headers: this.headers}).pipe(
        catchError((err) => {
          console.log("DeleteBook:"+err);
         return throwError(()=>err);
        }));   
  } 
InsertBook(book:book)
{
  this.postParams=book;
 return this.http.post(this.Url,this.postParams,{ headers: this.headers, observe: 'response'}).pipe(
    catchError((err) => {
         console.log("InsertBook:"+err);
        return throwError(()=>err);
       }));
}
EditBook(book:book)
{
  this.postParams=book;
  return this.http.put(this.Url,this.postParams,{ headers: this.headers}).pipe(
    catchError((err) => {
      console.log("EditBook:"+err);
     return throwError(()=>err);
    }));   
}

}





