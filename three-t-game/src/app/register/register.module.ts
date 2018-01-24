import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';

const ROUTES =
  [
    {
      path: 'new',
      component: UserComponent
    },
    // {
    //     path: 'existing',
    //     component: StudentDashboardComponent,
    // }
  ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    UserComponent
  ]
})
export class RegisterModule { }
