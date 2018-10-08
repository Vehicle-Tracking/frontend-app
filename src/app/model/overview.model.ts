import { VehicleOverView } from './vehicle.overview.model';
import { Owner } from './owner.model';

export class OverviewModel {
    public allOwners: Owner[] = [];
    public filteredVehicles: VehicleOverView[] = [];
    public ownerIdFilter: string;
    public statusFilter = -1;
}
