import { Component, OnInit } from '@angular/core';
import {UserRegistration} from '../../Models/user-registration';
import {UserService} from '../../Services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    if(valid)
    {
      this.userService.register(value.email,value.password,value.firstName,value.lastName,value.location)
        .subscribe(
          result  => {if(result){
            this.router.navigate(['/login'],{queryParams: {brandNew: true,email:value.email}});
          }},
          errors =>  this.errors = errors);
    }
  }
}
