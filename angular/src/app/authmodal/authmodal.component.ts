import { Component, OnInit, Input} from '@angular/core'; 

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'auth-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class AuthModalComponent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}