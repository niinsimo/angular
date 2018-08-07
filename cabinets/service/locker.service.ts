import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LockerLog} from '../models/lockerLog';
import {Classifier} from '../models/classifier';
import {take} from 'rxjs/operators';
import {ILocker} from '../models/ILocker';

@Injectable()
export class LockerService {

  private apiUrl = '/api/v2/delivery/lockers';

  private lockerLogSubject = new BehaviorSubject<LockerLog[]>(null);
  log$ = this.lockerLogSubject.asObservable();

  private lockersSubject = new BehaviorSubject<ILocker[]>(null);
  lockerLogs$ = this.lockersSubject.asObservable();

  private statusSubject = new BehaviorSubject<Classifier[]>(null);
  status$ = this.statusSubject.asObservable();

  constructor(
    private http: HttpClient) {
  }

  loadInactive(): void {
    this.lockersSubject.next(null);
    this.http.get(this.apiUrl + '/inactive').pipe(take(1))
      .subscribe((res: ILocker[]) => {
        this.lockersSubject.next(res);
      });
  }

  loadLogsById(lockerId: number): void {
    this.http
      .get(this.apiUrl + '/' + lockerId + '/lockerLog/')
      .subscribe((res: LockerLog[]) => {
        this.lockerLogSubject.next(res);
      });
  }

  loadStatusList(): void {
    this.http
      .get(this.apiUrl + '/statuses')
      .subscribe((res: Classifier[]) => {
        this.statusSubject.next(res);
      });
  }

  update(lockerId: number, data): void {
    this.http.put(this.apiUrl + '/' + lockerId, JSON.stringify(data)).pipe(take(1))
      .subscribe();

  }
}
