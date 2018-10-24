import { Component, OnInit, Input } from '@angular/core';

import { VehicleOverView } from '../../model/vehicle.overview.model';
import { DataService } from '../../core/service/data.service';

@Component({
  selector: 'app-tabular-overview',
  templateUrl: './tabular-overview.component.html',
  styleUrls: ['./tabular-overview.component.css']
})
export class TabularOverviewComponent implements OnInit {

  // @Input() vehicles: VehicleOverView[] = [];
  vehicles: VehicleOverView[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getOverviews().subscribe((overviews: VehicleOverView[]) => {
      this.vehicles = overviews;
    });

    this.dataService.OnUpdateData.subscribe((data: VehicleOverView[]) => {
      this.vehicles = data;
    });
  }
}
