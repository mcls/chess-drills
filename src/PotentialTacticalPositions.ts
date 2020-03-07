import * as _ from 'lodash';

export class PotentialTacticalPositions {
    readonly skewers: Array<string>
    readonly forks: Array<string>
    
    constructor(data: {forks: Array<string>, skewers: Array<string>}) {
        this.forks = data.forks
        this.skewers = data.skewers
    }

    allSquares(): Array<string> {
        return _.uniq(_.concat(this.forks, this.skewers))
    }

    get totalCount(): number {
        return this.allSquares().length
    }
}