import { Component, OnInit, Input} from '@angular/core'; 
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl} from '@angular/forms'; 

import { ApiService } from '../api.service'; 

import {ModalService} from '../_modal'; 
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html', 
 
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  bodyText: string; 
  
  constructor(private modalService: ModalService) { }

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
      let email: string = form.value.email;
      
    }
}
