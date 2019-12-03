import { Component, OnInit, Input} from '@angular/core'; 

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import {AuthModalComponent} from '../authmodal/authmodal.component'; 
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html', 
  styleUrls: ['./auth.component.css']
})
export class AuthComponent{
  constructor(private modalService: NgbModal) {}

  open() {
    console.log('here'); 
    const modalRef = this.modalService.open(AuthModalComponent);
    modalRef.componentInstance.name = 'World';
  }

}
