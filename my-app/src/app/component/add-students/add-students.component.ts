import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs';
import { Student } from 'src/app/model/student';
import { NetworkCallServiceService } from 'src/app/service/network-call-service.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit{
  formG!:FormGroup;
  followup:boolean=false;
  updateId!:any;


  constructor(private fb:FormBuilder,
    private serviceCall:NetworkCallServiceService,private route:Router,private aroute:ActivatedRoute)
  {
    this.formG=this.fb.group({
      studentname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20),this.uniqueValidate]],
      password:['',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!?#$*%&_])[a-zA-z0-9@!?#$*%&_]{8,}$')]],
      mobile:['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]],
      email:['',[Validators.required,Validators.email,]],
      dateofbirth:['',[Validators.required,this.dateValid]],
      from:['',[Validators.required,this.dateValid]],
      to:['',[Validators.required,this.dateValid]],
      salary:['',[Validators.required,this.positiveNumber]]
    
    },{validators:this.dateRange})
  }
  ngOnInit(): void {
    this.aroute.params.subscribe((param)=>
    {
        this.updateId = param['id'];
        this.getAppointment(this.updateId);
  
    })
  }
  getAppointment(id:any)
  {
    this.serviceCall.viewByIdNew(id).subscribe((data:any)=>
    {
      var d = data[0];
      this.formG.patchValue({
      studentname:d.studentname,
      password:d.password,
      mobile:d.mobile,
      email:d.email,
      dateofbirth:d.dateofbirth,
      salary:d.salary,
      id:d.id
      });
    });
   
  }
  onChange(e:any)
  {
    if(e.target.value == "Follow-Up")
    {
      this.followup=true;
    }else{
      this.followup=false;
    }
  }
 

  addInfo()
  {
    if(this.formG.valid)
    {
        if(this.updateId)
        {
          this.serviceCall.updateStudent(this.updateId,this.formG.value).subscribe(()=>
          {
            alert('updated')
            this.route.navigate(['/viewStudent'])
          });
        }else{

          this.serviceCall.addStudent(this.formG.value).subscribe((data)=>
          {
            console.log(data)
            alert("Welcome")
            // this.route.navigateByUrl('app-add-students')
          })
      }
    }

  }
  uniqueValidate(con:AbstractControl):ValidationErrors | null{
    const studentId = con.value;
    let value = JSON.parse(localStorage.getItem('studentData') || '{}')
    if(Array.isArray(value))
    {
      const studsId = value.map((student:Student)=> student.studentname)
      if(studsId.includes(studentId))
      {
        return{duplicatevalue:true}
      }
      
     
    }
    return null;

  }

  dateRange(group:FormGroup): ValidationErrors | null{
    const startDate = group.get('from')?.value;
    const endDate = group.get('to')?.value;
    if(startDate && endDate)
    {
      const st = new Date(startDate);
      const en = new Date(endDate);
      if(en < st)
      {
      return {dateRangeInvalid:true};
      }
    }
    return null;
  }
  dateValid(control:AbstractControl): ValidationErrors | null{
    const  datep = /^\d{4}-\d{2}-\d{2}$/;
    if(!datep.test(control.value))
    {
      return {
        retVal:true
      };
    }
    return null;

  }
  positiveNumber(control:AbstractControl): ValidationErrors | null{
    const value = control.value;
    if(value!=='' && value !== null && value > 0)
    {
      return null
    }
    return {positive:true}

  }
 
}
