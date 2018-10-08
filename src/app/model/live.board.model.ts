import { VehicleStatus } from './vehicel.status.model';

export class LiveBoardModel {
    public pageItems: VehicleStatus[] = [];

    constructor(public statusItems: VehicleStatus[],
        public pagerItem: {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages: any[]
        }) {
    }
}
