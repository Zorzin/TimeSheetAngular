import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.css']
})
export class EntryDialogComponent implements OnInit {

  public entryForm : FormGroup;
  public date:FormControl;
  public type:FormControl;

  workTypes = [
    {value: 'office', viewValue: 'Office'},
    {value: 'delegation', viewValue: 'Delegation'},
    {value: 'remote', viewValue: 'Remote'},
    {value: 'paidleave', viewValue: 'Paid Leave'},
    {value: 'freeleave', viewValue: 'Free Leave'},
  ]
  startValue = {hour: 8, minute: 0};
  endValue = {hour: 16, minute: 0};


  constructor(public dialogRef: MatDialogRef<EntryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)
  {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }


  createFormControls() {
    this.date = new FormControl('', [
      Validators.required
    ]);

    this.type = new FormControl('office', [
      Validators.required
    ]);
  }

  createForm(){
    this.entryForm = new FormGroup({
      date: new FormGroup({
        dateValue: this.date
      }),
      type: new FormGroup({
        workTypeValue: this.type
      })
    });
  }
}
