import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AppService } from '../../app.service';
import { isNullOrUndefined } from 'util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../api-client/controllers/user.service';
import { User } from '../../api-client/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  newUserForm: FormGroup;
  busy: boolean = false;

  constructor(
    private _app: AppService,
    private _router: Router,
    private _fb: FormBuilder,
    private _user: UserService
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this._app.getUser())) {
      //redirect to game
      this.redirect();
    }
    this.createForm();
  }
  
  createForm() {
    this.newUserForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      alias: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  acceptUser() {
    if (this.busy) return;
    if (this.newUserForm.invalid || this.newUserForm.pristine) return;
    let newUser: User = {
      name: this.newUserForm.controls['name'].value,
      alias: this.newUserForm.controls['alias'].value
    }
    this._user.set(newUser).subscribe(res => {
      this._app.setUser(res);
      this.redirect();
    });
  }

  redirect() {
    this._router.navigate(['/board/new']);
  }
}
