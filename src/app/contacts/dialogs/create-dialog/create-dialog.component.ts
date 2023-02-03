import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent {
  protected data = {name: null, phoneNumber: null};
  phoneFormControl = new FormControl('', [ Validators.pattern('[- +()0-9]+')]);
  nameFormControl = new FormControl('', [Validators.required]);
}
