import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) {

   }
    
   getSales(){
     return this.http.get(`${this.uri}/sales`);
   }

   getSalesById(id){
     return this.http.get(`${this.uri}/sales/${id}`);
   }

   addSales(name,mail,working_route,phone_no) {
     var sales = {
       name:name,
       mail:mail,
       working_route:working_route,
       phone_no : phone_no
     };
     return this.http.post(`${this.uri}/sales/add`,sales);
   }

   updateSales(id,name,mail,working_route,phone_no) {
    var sales = {
      name:name,
      mail:mail,
      working_route:working_route,
      phone_no : phone_no
    };
    return this.http.post(`${this.uri}/sales/update/${id}`,sales);
  }

  deleteSales(id){
    return this.http.get(`${this.uri}/sales/delete/${id}`);
  }

}


