import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, toArray } from 'rxjs';
import { Student } from 'src/app/model/student';
import { NetworkCallServiceService } from 'src/app/service/network-call-service.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  stud1$: Observable<Student[]> = of([]);
  finaldata$: Observable<Student[]> = of([]);
  isValue!: string;
  constructor(private serviceCall: NetworkCallServiceService, private aroute: ActivatedRoute, private route: Router) {
  }
  getData() {
    this.stud1$ = this.serviceCall.viewStudent();
    this.finaldata$ = this.stud1$;
    this.finaldata$.pipe(toArray());
    let sa;
    this.finaldata$.subscribe((data) => {
      sa = data
      if(sa) {
        const Array = JSON.stringify(sa);
        localStorage.setItem('studentData', Array);
      }
    });

  }
  ngOnInit(): void {
    // this.isValue = String(this.aroute.snapshot.paramMap.get('id'));
    // if (this.isValue) {
    //   this.deleteRecord(this.isValue);
    // }
    this.aroute.params.subscribe((param)=>
    {
      this.isValue = param['id']
      this.deleteRecord(this.isValue)
    })
    this.getData();

  }
  deleteRecord(id: any) {
    this.serviceCall.deleteById(id).subscribe(() => {
      alert("Deleted Successfully");
      this.route.navigate(['/viewStudent']);
    })
  }
  searchValue(e: any) {
    const value = e.target.value;
    if (!value) {
      this.finaldata$ = this.stud1$;
      return;
    } else {
      this.finaldata$ = this.stud1$
        .pipe(map((students) => {
          return students.filter(
            (student) =>
              student.studentname.toString().includes(value) || student.id?.toString().includes(value)
          );

        })
        )

    }
  }



}
