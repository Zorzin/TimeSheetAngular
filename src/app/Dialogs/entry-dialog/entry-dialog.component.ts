import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EntryService} from '../../Services/entry.service';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.css']
})
export class EntryDialogComponent implements OnInit {

  public entryForm : FormGroup;
  public date:FormControl;
  public type:FormControl;

  allDaySwitch : boolean = false;
  dateValue : Date;
  workTypes = [
    {value: 'office', viewValue: 'Office'},
    {value: 'delegation', viewValue: 'Delegation'},
    {value: 'remote', viewValue: 'Remote'},
    {value: 'paidleave', viewValue: 'Paid Leave'},
    {value: 'freeleave', viewValue: 'Free Leave'},
  ]
  startValue = {hours: 8, minutes: 0};
  endValue = {hours: 16, minutes: 0};
  outsideValue = {hours: 0, minutes: 0};


  constructor(public dialogRef: MatDialogRef<EntryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private entryService: EntryService)
  {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }


  createFormControls() {
    this.date = new FormControl(this.data.dateValue, [
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

  closeDialog() {

  }

  save() {
    this.entryService.SaveEntry(this.startValue,this.endValue,this.date.value,this.outsideValue,this.type.value,this.allDaySwitch);
  }
}
