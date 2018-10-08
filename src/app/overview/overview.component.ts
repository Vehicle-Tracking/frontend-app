import { Component, OnInit, NgZone } from '@angular/core';

import { OverviewModel } from '../model/overview.model';
import { OverviewHubService } from '../core/service/overview.hub.service';
import { DataService } from '../core/service/data.service';
import { VehicleOverView } from '../model/vehicle.overview.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  overviewInfo: OverviewModel = new OverviewModel();

  constructor(private overviewHub: OverviewHubService, private dataService: DataService) { }

  ngOnInit() {
    this.overviewInfo.filteredVehicles = this.dataService.filteredOverViewItems;

    this.overviewHub.messageReceived.subscribe((status: VehicleOverView) => {
      this.dataService.OnNewStatusArriaved.emit(status);
    });
  }

}
