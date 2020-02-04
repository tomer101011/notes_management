import { Item } from './Item';
export class Note {
    name: string
    items: Item[]
    deletedItems: Item[]
    color: string
    dateOfCreation: Date
    latestUpdateDate: Date

    constructor(name: string, items: Item[], color: string, dateOfCreation: Date, latestUpdateDate: Date) {
        this.name = name;
        this.items = items;
        this.color = color;
        this.dateOfCreation = dateOfCreation;
        this.latestUpdateDate = latestUpdateDate;
        this.deletedItems = [];
    }
}