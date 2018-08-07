import {Component, Inject, OnInit} from '@angular/core';
import {LockerLog} from '../../models/lockerLog';
import {LockerService} from '../../services/locker.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Subscription} from 'rxjs';
import {Classifier} from '../../models/classifier';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ILocker} from '../../models/ILocker';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-list-content.component.html'
})
export class DashboardListContentComponent implements OnInit {
  lockerLogs: ILocker[];
  log: LockerLog[];

  constructor(private lockerService: LockerService, public dialog: MatDialog) {
  }

  openLog(lockerId): void {
    this.dialog.open(LockerLogModalComponent, {
      width: '800px',
      data: {lockerId: lockerId}
    });
  }

  editStatus(lockerId): void {
    this.dialog.open(LockerStatusModalComponent, {
      width: '800px',
      data: {lockerId: lockerId}
    });
  }

  ngOnInit(): void {
    this.lockerService.lockerLogs$
      .subscribe(lockerLogs => {
        this.lockerLogs = lockerLogs;
      });
    this.lockerService.log$
      .subscribe(log => {
        this.log = log;
      });
  }

  getStatusColor(lockerStatus) {
    switch (lockerStatus) {
      case 'Vajab tähelepanu':
        return '#FF0000';
      case 'Vajab remonti':
        return '#0f1aff';
      case 'Vajab koristust':
        return '#0f1aff';
      case 'Remondis':
        return '#59382b';
      case 'Koristamisel':
        return '#59382b';
      case 'Välja lülitatud':
        return '#000000';
      case 'Vale temperatuur':
        return '#0f1aff';
    }
  }

}

@Component({
  selector: 'app-locker-log-modal',
  templateUrl: 'locker-log-modal.component.html',
})

export class LockerLogModalComponent implements OnInit {
  log: LockerLog[];
  lockerLogSubscription: Subscription;

  constructor(private lockerService: LockerService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.lockerService.loadLogsById(this.data.lockerId);
    this.lockerLogSubscription = this.lockerService.log$
      .subscribe(log => {
        this.log = log;
      });
  }
}


@Component({
  selector: 'app-locker-status-modal',
  templateUrl: 'locker-status-modal.component.html',
})

export class LockerStatusModalComponent implements OnInit {
  statuses: Classifier[];
  status: Classifier;
  statusSubscription: Subscription;
  form: FormGroup;

  constructor(private lockerService: LockerService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<LockerStatusModalComponent>) {

    this.form = this.formBuilder.group({
      comment: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      this.lockerService.update(this.data.lockerId, Object.assign({}, this.form.value));
      this.lockerService.loadInactive();
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
    this.lockerService.loadStatusList();
    this.statusSubscription = this.lockerService.status$
      .subscribe(statuses => {
        this.statuses = statuses;
      });
  }
}
