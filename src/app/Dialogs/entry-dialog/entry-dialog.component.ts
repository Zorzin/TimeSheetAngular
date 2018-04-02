import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EntryService} from '../../Services/entry.service';
import {EntryDialogType} from '../../Helpers/entry-dialog-type.enum';
import {Entry} from '../../Models/entry';

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
  startValue = {hour: 8, minute: 0};
  endValue = {hour: 16, minute: 0};
  outsideValue = {hour: 0, minute: 0};


  constructor(public dialogRef: MatDialogRef<EntryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private entryService: EntryService)
  {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.GetEntryIfUpdate();
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

  private GetEntryIfUpdate() {
    console.log(this.data.dialogType);
    if(this.data.dialogType == EntryDialogType.Update) {
      let entry: Entry = this.data.entry;
      console.log(entry);
      this.startValue = this.GetTimeFromString(entry.startTime);
      this.endValue = this.GetTimeFromString(entry.endTime);
      this.outsideValue = this.GetTimeFromString(entry.outsideTime);
      this.allDaySwitch = entry.allDay;
      this.type.setValue(entry.type);
    }
  }

  GetTimeFromString(time : string)
  {
    let splitted = time.split(":", 3);
    return{hour: +splitted[0], minute: +splitted[1]};
  }
}
