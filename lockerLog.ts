import {Cabinet} from '../../orders/models/cabinet.model';
import {ILocker} from './ILocker';
import {Route} from '@angular/compiler/src/core';
import {IStore} from './store';

export interface LockerLogModel {
  id: number;
  cabinet: Cabinet;
  locker: ILocker;
  route: Route;
  store: IStore;
  comment: string;
  status: string;
  createdAt: number;
}

export class LockerLog implements LockerLogModel {
  id: number;
  cabinet: Cabinet;
  locker: ILocker;
  route: Route;
  store: IStore;
  comment: string;
  status: string;
  createdAt: number;
}
