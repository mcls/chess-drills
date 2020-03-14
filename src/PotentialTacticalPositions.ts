import {uniq, concat} from 'lodash';

interface ConstructorArgs {
    skewers: Array<string>;
    forks: Array<string>;
    unsafeSquares: Array<string>;
}
export class PotentialTacticalPositions {
    readonly skewers: Array<string>
    readonly forks: Array<string>
    readonly unsafeSquares: Array<string>
    
    constructor(data: ConstructorArgs) {
        this.forks = data.forks
        this.skewers = data.skewers
        this.unsafeSquares = data.unsafeSquares
    }

    // all squares with tactics
    allSquares(): Array<string> {
        return uniq(concat(this.forks, this.skewers))
    }

    get totalCount(): number {
        return this.allSquares().length
    }
}