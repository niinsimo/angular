import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_LABEL_GLOBAL_OPTIONS, MatButtonModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {SortablejsModule} from 'angular-sortablejs';
import {CabinetListPageComponent} from './containers/cabinet-list-page/cabinet-list-page.component';
import {CabinetListComponent} from './components/cabinet-list/cabinet-list.component';
import {CabinetService} from './services/cabinet.service';
import {CabinetSettingsComponent} from './containers/cabinet-settings-view/cabinet-settings.component';
import {CabinetSettingsTabContentComponent} from './components/cabinet-settings-tab-content/cabinet-settings-tab-content.component';
import {CabinetStatusTabContentComponent} from './components/cabinet-status-tab-content/cabinet-status-tab-content.component';
import {SettingsComponent} from './containers/settings/settings.component';
import {SettingsService} from './services/settings.service';
import {GeneralSettingsComponent} from './components/general-settings/general-settings.component';
import {StoreListComponent} from './components/store-list/store-list.component';
import {RegionListComponent} from './components/region-list/region-list.component';
import {RouteViewComponent} from './containers/route-view/route.component';
import {RouteVersionViewComponent} from './containers/route-version-view/route-version.component';
import {AddRouteComponent} from './containers/add-route/add-route.component';
import {RouteBreadcrumbComponent} from './components/route-breadcrumb/route-breadcrumb.component';
import {RouteDataContentComponent} from './components/route-data-content/route-data-content.component';
import {RouteDataHeaderComponent} from './components/route-data-header/route-data-header.component';
import {RouteVersionDeliveryDataComponent} from './components/route-version-delivery-data/route-version-delivery-data.component';
import {RouteVersionGeneralDataComponent} from './components/route-version-general-data/route-version-general-data.component';
import {RouteDataHeaderFilterComponent} from './components/route-data-header/route-data-header-filter/route-data-header-filter.component';
import {RouteService} from './services/route.service';
import {RouteVersionTimeslotsComponent} from './components/route-version-timeslots/route-version-timeslots.component';
import {RouteVersionService} from './services/route-version.service';
import {DashboardViewComponent} from './containers/dashboard-view/dashboard-view.component';
import {
  DashboardListContentComponent,
  LockerLogModalComponent,
  LockerStatusModalComponent
} from './components/dashboard-list-content/dashboard-list-content.component';
import {LockerService} from './services/locker.service';

import {ConvertToRomanNumberPipe} from '../shared/convert-to-roman-number.pipe';

import {RegionEditComponent} from './components/region-edit/region-edit.component';

import {StoreEditComponent} from './components/store-edit/store-edit.component';
import {AddRouteVersionComponent} from './containers/add-route-version/add-route-version.component';

import { CabinetLogTabContentComponent } from './components/cabinet-log-tab-content/cabinet-log-tab-content.component';

import {AuthGuard} from '../core/services';


const routes = [
  {path: 'cabinets', component: CabinetListPageComponent, canActivate: [ AuthGuard ]},
  {path: 'cabinets/:id/status', component: CabinetSettingsComponent, canActivate: [ AuthGuard ]},
  {path: 'cabinets/:id/log', component: CabinetSettingsComponent, canActivate: [ AuthGuard ]},
  {path: 'cabinets/delete/:id', component: CabinetSettingsComponent, canActivate: [ AuthGuard ]},
  {path: 'cabinets/:id/settings', component: CabinetSettingsComponent, canActivate: [ AuthGuard ]},
  {path: 'delivery/settings/general', component: SettingsComponent, canActivate: [ AuthGuard ]},
  {path: 'delivery/settings/stores', component: SettingsComponent, canActivate: [ AuthGuard ]},
  {path: 'delivery/settings/stores/:id', component: StoreEditComponent, canActivate: [ AuthGuard ]},
  {path: 'delivery/settings/regions', component: SettingsComponent, canActivate: [ AuthGuard ]},
  {path: 'delivery/settings/regions/new', component: RegionEditComponent, canActivate: [ AuthGuard ]},
  {path: 'delivery/settings/regions/:id', component: RegionEditComponent, canActivate: [ AuthGuard ]},
  {path: 'routes', component: RouteViewComponent, canActivate: [ AuthGuard ]},
  {path: 'routes/versions/:id', component: RouteVersionViewComponent, canActivate: [ AuthGuard ]},
  {path: 'routes/add', component: AddRouteComponent, canActivate: [ AuthGuard ]},
  {path: 'dashboard', component: DashboardViewComponent, canActivate: [ AuthGuard ]},
  {path: 'routes/versions/:id/add-version', component: AddRouteVersionComponent, canActivate: [ AuthGuard ]},
];

@NgModule({
  imports: [
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    SortablejsModule,
    MatButtonModule
  ],
  entryComponents: [
    LockerLogModalComponent,
    LockerStatusModalComponent
  ],
  declarations: [
    CabinetListPageComponent,
    CabinetSettingsTabContentComponent,
    CabinetListComponent,
    CabinetSettingsComponent,
    CabinetStatusTabContentComponent,
    SettingsComponent,
    GeneralSettingsComponent,
    StoreListComponent,
    StoreEditComponent,
    RegionListComponent,
    RouteViewComponent,
    RouteVersionViewComponent,
    AddRouteComponent,
    RouteBreadcrumbComponent,
    RouteDataContentComponent,
    RouteDataHeaderComponent,
    RouteVersionDeliveryDataComponent,
    RouteVersionGeneralDataComponent,
    RouteDataHeaderFilterComponent,
    RouteVersionTimeslotsComponent,
    DashboardViewComponent,
    DashboardListContentComponent,
    LockerLogModalComponent,
    LockerStatusModalComponent,
    RegionEditComponent,
    ConvertToRomanNumberPipe,
    AddRouteVersionComponent,
    CabinetLogTabContentComponent
  ],
  providers: [
    CabinetService,
    SettingsService,
    RouteService,
    LockerService,
    RouteVersionService,
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}

  ]
})

export class CabinetsModule {
}
