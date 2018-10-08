export class VehicleStatus {

    constructor(public vin: string,
        public regNumber: string,
        public ownerName: string,
        public OwnerAddress: string,
        public statusDate: number,
        public statusDateFormetted: string,
        public status: number) {
            try {
            //    this.date = new Date(statusDate);
            } catch (error) {
                console.error(error);
            }
        }
}
