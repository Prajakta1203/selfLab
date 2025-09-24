import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { NetworkCallServiceService } from 'src/app/service/network-call-service.service';

@Component({
  selector: 'app-update-record',
  templateUrl: './update-record.component.html',
  styleUrls: ['./update-record.component.css']
})
export class UpdateRecordComponent implements OnInit {
  formG!: FormGroup;
  successStatus:boolean=false;
  isValue!:string;

  constructor(private fb: FormBuilder,
    private serviceCall: NetworkCallServiceService,private route:Router,private aroute:ActivatedRoute) {
    this.formG = this.fb.group({
      studentname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],
      dateofbirth: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.isValue=String(this.aroute.snapshot.paramMap.get('id'));
    if(this.isValue)
    {
      this.serviceCall.viewById(this.isValue).subscribe((data)=>{
        this.formG.patchValue(data);
      })
    }

  }
  updateStudent() {
    if (this.formG.valid) {

      this.serviceCall.updateStudent(this.isValue,this.formG.value).subscribe((data) => {
        
        alert("Update success")
        this.route.navigate(['/viewStudent'])
      })
    }

  }

}
