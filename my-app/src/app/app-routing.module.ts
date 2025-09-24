import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewByIdStudentsComponent } from './component/view-by-id-students/view-by-id-students.component';
import { ViewStudentsComponent } from './component/view-students/view-students.component';
import { AddStudentsComponent } from './component/add-students/add-students.component';
import { UpdateRecordComponent } from './component/update-record/update-record.component';

const routes: Routes = [
  {path:'viewById/:id',component:ViewByIdStudentsComponent},
  {path:'viewStudent', component:ViewStudentsComponent},
  {path:'viewStudent/:id', component:ViewStudentsComponent},
  {path:'addStudent', component:AddStudentsComponent},
  {path:'addStudent/:id',component:AddStudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
