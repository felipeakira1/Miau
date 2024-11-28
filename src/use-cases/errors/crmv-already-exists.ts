export class CRMVAlreadyExists extends Error {
    constructor() {
        super('CRMV Already exists')
    }
}