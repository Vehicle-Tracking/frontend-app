import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalConfig } from '../../shared/app.constants';
import { VehicleOverView } from '../../model/vehicle.overview.model';
import { isNgTemplate } from '@angular/compiler';
import { Filters } from 'src/app/model/filters.model';

@Injectable()
export class DataService {
  private url: string;
  private overViewItems: VehicleOverView[] = [];
  private filters: { SelectedOwner: string, SelectedStatus: number };

  OnFilterChanged = new EventEmitter<{ SelectedOwner: string, SelectedStatus: number }>();
  OnNewStatusArriaved = new EventEmitter<VehicleOverView>();
  OnUpdateData = new EventEmitter<VehicleOverView[]>();
  filteredOverViewItems: VehicleOverView[] = [];

  constructor(private http: HttpClient, private ngZone: NgZone) {
    this.url =
      GlobalConfig.baseUrl.server +
      GlobalConfig.baseUrl.apiUrl;

    this.filters = { SelectedOwner: '', SelectedStatus: -1 };

    this.getOverviews().subscribe((overviews: VehicleOverView[]) => {
      this.overViewItems = overviews;
      this.filteredOverViewItems = this.overViewItems;
    });

    this.registerToEvent();
  }

  private registerToEvent() {

    this.OnNewStatusArriaved.subscribe((status: VehicleOverView) => {
      this.ngZone.run(() => {

        const itemIndex = this.overViewItems.findIndex((item) =>
          item.vehicle.vin.toLocaleLowerCase() === status.vehicle.vin.toLocaleLowerCase());

        if (itemIndex !== -1) {
          this.overViewItems.splice(itemIndex, 1);
        }
        this.overViewItems.push(status);

        this.OnFilterChanged.emit({ SelectedOwner: this.filters.SelectedOwner, SelectedStatus: this.filters.SelectedStatus });
      });
    });

    this.OnFilterChanged.subscribe((filter: { SelectedOwner: string, SelectedStatus: number }) => {
      this.ngZone.run(() => {
        this.filters = filter;
        this.filterResult(filter.SelectedOwner, filter.SelectedStatus);
        this.OnUpdateData.emit(this.filteredOverViewItems);
      });
    },
      error => {
        console.error(error);
      });
  }

  private filterResult(owner: string, status: number) {
    this.filteredOverViewItems =
      this.overViewItems
        .filter(element => {
          return (status > -1
            ? element.lastStatus === status
            : 1 === 1) &&
              (owner !== ''
              ? element.vehicle.owner.name === owner
              : 1 === 1);
        });
  }

  public getOverviews(): Observable<VehicleOverView[]> {
    return this.http
      .get<VehicleOverView[]>(this.url)
      .pipe(catchError(er => throwError(er)));
  }

  public getFilters(): Observable<Filters> {
    return this.http
      .get<Filters>(this.url + '/filters')
      .pipe(catchError(er => throwError(er)));
  }
}
