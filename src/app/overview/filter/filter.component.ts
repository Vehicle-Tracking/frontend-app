import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Filters } from 'src/app/model/filters.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  SelectedOwner = '';
  SelectedStatus = '';
  private filterItems = new Filters([] , []);
  // @Output() OnFilterChanged = new EventEmitter<{SelectedOwner: string, SelectedStatus: number}>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getFilters().subscribe((filters: Filters) => {
      this.filterItems = filters;
    });

  }

  SelectedOwnerChanged(event, selectedIndex) {
    this.dataService.OnFilterChanged.emit({
      SelectedOwner: event.target.value ,
      SelectedStatus: this.SelectedStatus !== '' ? parseInt(this.SelectedStatus, 10) : -1
    });
  }

  SelectedStatusChanged(event, selectedIndex) {
    this.dataService.OnFilterChanged.emit({
      SelectedOwner: this.SelectedOwner,
      SelectedStatus: event.target.value !== '' ? parseInt(event.target.value, 10) : -1
    });
  }
}
