
import { Component, OnInit, Input} from '@angular/core'; 
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl} from '@angular/forms'; 
import * as jwt_decode from 'jwt-decode'; 
import { ApiService } from '../api.service'; 

import { HttpResponse } from '@angular/common/http'; 
import {ModalService} from '../_modal'; 
import { logging } from 'protractor';
export class Response{ 
  token: string; 
  status: string; 
  statusCode: number; 
}
export class httpResponse{ 
  body: object; 
  statusMsg: string; 
  statusCode: number; 
}
export class UserInfo{ 
  _id: string; 
  username: string;
  firstName: string;
  lastName: string
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html', 
 
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  bodyText: string; 
  
  constructor(private modalService: ModalService, private apiService: ApiService) { }

    ngOnInit() {
        this.bodyText = 'This text can be updated in modal 1';
        
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }
    register(form: any){ 
      console.log(form.value); 
      let username: string = form.value.name; 
      let password: string = form.value.password; 
      let firstName: string = form.value.firstName;
      let lastName: string = form.value.lastName; 
      this.apiService.register(username, firstName, lastName, password).subscribe((data) => { 
        
        let httpResp: HttpResponse<Object> = data as HttpResponse<Object>; 

        let body = httpResp.body as unknown as Response; 

        if (body.statusCode == 200) { 
          this.closeModal('custom-modal-1'); 
          var contents: Response = body; 
          localStorage.setItem('token', contents.token); 
          console.log(jwt_decode(contents.token)); 
          var bet: UserInfo = jwt_decode(contents.token) as UserInfo; 
          alert(`Welcome to Savant ${bet.username}`); 
        } 
        else{ 
          alert("unsuccessful registration!"); 
        }
      }); 
      
    }
    login(form: any){ 
      let username: string = form.value.name; 
      let password: string = form.value.password; 

      this.apiService.login(username, password).subscribe(data => { 
        let httpResp: HttpResponse<Object> = data as HttpResponse<Object>; 
        
        console.log(httpResp.status); 
        let body: Response = httpResp.body as unknown as Response; 
        console.log(body); 
        if (body.statusCode == 200){ 
          var contents: Response = body; 
          localStorage.setItem('token', contents.token); 
          var bet: UserInfo = jwt_decode(contents.token) as UserInfo;
          alert(`Welcome back ${bet.username}`); 
          this.closeModal('custom-modal-1'); 
        }
        else{ 
          alert(`you dumb`); 
        }
      }); 
    }
}