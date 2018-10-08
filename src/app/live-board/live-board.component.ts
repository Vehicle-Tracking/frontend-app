import { Component, OnInit } from '@angular/core';

import { LiveBoardModel } from '../model/live.board.model';
import { PingHubService } from '../core/service/ping.hub.service';
import { PagerService } from '../core/service/pager.service';

@Component({
  selector: 'app-live-board',
  templateUrl: './live-board.component.html',
  styleUrls: ['./live-board.component.css'],
  providers: []
})
export class LiveBoardComponent implements OnInit {
  private pageModel: LiveBoardModel;

  constructor(private pingHub: PingHubService, private pagerService: PagerService) { }

  ngOnInit() {
    this.pingHub.messageReceived.subscribe((data) => {
      if (!this.pageModel) {
        this.pageModel = new LiveBoardModel([], null);
      }
      this.pageModel.statusItems.push(data);


      this.pageModel.statusItems.sort(function (a, b) {
        return b.statusDate - a.statusDate;  // sort descendingly
      }).slice(0, 150); // keep only the last 150 items

      const currentPage = this.pageModel && this.pageModel.pagerItem  && !!this.pageModel.pagerItem.currentPage
                          ? this.pageModel.pagerItem.currentPage
                          : 0;
      const pageSize = this.pageModel && this.pageModel.pagerItem && !!this.pageModel.pagerItem.pageSize
                          ? this.pageModel.pagerItem.pageSize
                          : 10;

      this.pageModel.pagerItem =
        this.pagerService
          .getPager(this.pageModel.statusItems.length,
            currentPage,
            pageSize);

      this.pageModel.pageItems =
        this.pageModel.statusItems
          .slice(this.pageModel.pagerItem.startIndex,
            this.pageModel.pagerItem.endIndex + 1);
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pageModel.pagerItem.totalPages) {
      return;
    }

    this.pageModel.pagerItem = this.pagerService.getPager(this.pageModel.statusItems.length, page);

    this.pageModel.pageItems =
      this.pageModel.statusItems.slice(
        this.pageModel.pagerItem.startIndex,
        this.pageModel.pagerItem.endIndex + 1);
  }

}
