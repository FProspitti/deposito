import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService} from "angular2-flash-messages";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessagesService : FlashMessagesService) {

  }

  ngOnInit() {
  }

  onLoginSubmit(){
    const  user= {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
    if(data.success){
      console.log('entra true');
  this.authService.storeUserData(data.token,data.user);
      this.flashMessagesService.show('Estas logueado',{cssClass: 'alert-succces', timeout:5000})
      this.router.navigate(['/dashboard']);
    }else{
      console.log('entra false');
      this.flashMessagesService.show(data.msg,{cssClass: 'alert-danger', timeout:5000})
      this.router.navigate(['/login']);
    }
    });
  }
}
