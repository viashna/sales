import { Component, OnInit } from '@angular/core';
import {SalesService } from '../../sales.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import  { Sales } from '../../sales.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  sales : Sales[];
  displayedColumns = ['name','mail','working_route','phone_no'];

  constructor(private salesService:SalesService,private router:Router) { 
    
  }
   
  ngOnInit() {
    this.fetchSales();
  }

  fetchSales(){
    console.log("good");
    this.salesService
      .getSales()
      .subscribe((data: Sales[]) => {
        this.sales = data;
        console.log('Data requested ...');
        console.log(this.sales);
    });
  }

  editSales(id){
    this.router.navigate(['/edit/${id}']);
  }

  deleteSales(id){
    this.salesService.deleteSales(id).subscribe(()=>{
      this.fetchSales();
    })
  }

  
}
