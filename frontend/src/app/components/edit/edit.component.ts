import { Component, OnInit } from '@angular/core';
import {SalesService } from '../../sales.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material';
import { Sales } from '../../sales.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id:String;
  sales:any={};
  updateForm:FormGroup;

  constructor(private salesService:SalesService,private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id = params.id;
      this.salesService.getSalesById(this.id).subscribe(res=>{
        this.sales = res;
        this.updateForm.get('name').setValue(this.sales.name);
        this.updateForm.get('mail').setValue(this.sales.mail);
        this.updateForm.get('working_route').setValue(this.sales.working_route);
        this.updateForm.get('phone_no').setValue(this.sales.phone_no);
        
      })
    })
  }

  createForm(){
    this.updateForm = this.fb.group({
      name:['',Validators.required],
      mail:'',
      working_route:'',
      phone_no:''
    });
  }

  updateSales(name,mail,working_route,phone_no){
    this.salesService.updateSales(this.id,name,mail,working_route,phone_no).subscribe(()=>{
      this.snackBar.open('Sales updates sucessfully','ok',{
        duration:3000,
      });

    });
  }

}
