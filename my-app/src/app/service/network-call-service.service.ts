import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class NetworkCallServiceService {
  apiUrl:string="https://ec2-43-205-113-203.projects.wecreateproblems.com/proxy/3000/studentData"
  constructor(private httpCall:HttpClient) { }

  addStudent(studentData:Student):Observable<any>
  {
    alert("You Called Service file");
    return this.httpCall.post(this.apiUrl,studentData);
  }
  viewStudent():Observable<any>
  {
    return this.httpCall.get(this.apiUrl);
  }
  viewById(id:any):Observable<any>
  {
    return this.httpCall.get(this.apiUrl+"/"+id)

  }
  viewByIdNew(id:any):Observable<any[]>
  {
    return this.httpCall.get<any[]>(this.apiUrl+"/"+id).pipe(map((data)=>
      {
        if(Array.isArray(data))
        {
          return data;
        }
        return [data]
      })
    );
  }
  deleteById(id:any):Observable<any>
  {
    return this.httpCall.delete(this.apiUrl+"/"+id);
  }
  updateStudent(id:any,std:Student):Observable<any>
  {
    return this.httpCall.put(this.apiUrl+"/"+id,std);
  }

}
