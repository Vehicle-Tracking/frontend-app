import { Pair } from './pair.model';

export class Filters {

    constructor(public owners: Pair[],
                public allStatus: Pair[]) {
    }
}
