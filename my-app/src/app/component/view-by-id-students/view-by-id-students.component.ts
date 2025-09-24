import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Student } from 'src/app/model/student';
import { NetworkCallServiceService } from 'src/app/service/network-call-service.service';

@Component({
  selector: 'app-view-by-id-students',
  templateUrl: './view-by-id-students.component.html',
  styleUrls: ['./view-by-id-students.component.css']
})
export class ViewByIdStudentsComponent implements OnInit {
  stud!:Student;
  constructor(private ar:ActivatedRoute,
    private serviceCall:NetworkCallServiceService
  )
  {
    
  }
  ngOnInit(): void {
    // const id = this.ar.snapshot.paramMap.get('id');
    // this.serviceCall.viewById(id).subscribe((data)=>
    // {
    //   console.log(data);
    //   this.stud=data;
    // })
    this.ar.params.subscribe((param)=>
    {
      const id = param['id'];
      this.getById(id);
    })
  }
  getById(id:any)
  {
    this.serviceCall.viewById(id).subscribe((data)=>
    {
      console.log(data);
      this.stud=data;
    })
  }


}
