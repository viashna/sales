import { Component, OnInit } from '@angular/core';
import {SalesService } from '../../sales.service';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
   
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private salesService:SalesService,private fb:FormBuilder,private router:Router) { 
    this.createForm = this.fb.group({
      name: ['',Validators.required],
      mail : '',
      working_route:'',
      phone_no:''
    })
  }

  addSales(name,mail,working_route,phone_no){
    this.salesService.addSales(name,mail,working_route,phone_no).subscribe(()=>{
      this.router.navigate(['/list']);
    })
  }

  ngOnInit() {
  }

}
