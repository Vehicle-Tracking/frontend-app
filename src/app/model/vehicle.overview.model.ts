import { Vehicle } from './vehicle.mode';
import { Owner } from './owner.model';

export class VehicleOverView {
    public vehicle: Vehicle;
    public availablity: number;
    public lastStatus: 0 | 1;
    public lastSync: string;

    public lastSyncFormetted: string;
    public ownerName: string = this.vehicle && this.vehicle.owner ? this.vehicle.owner.name : '-';
}
