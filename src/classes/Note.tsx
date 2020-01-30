import { Item } from './Item';
export class Note {
    name: string
    items: Item[]
    dateOfCreation: Date
    latestUpdateDate: Date

    constructor(name: string, items: Item[], dateOfCreation: Date, latestUpdateDate: Date) {
        this.name = name;
        this.items = items;
        this.dateOfCreation = dateOfCreation;
        this.latestUpdateDate = latestUpdateDate;
    }
}