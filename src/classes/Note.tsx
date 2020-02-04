import { Item } from './Item';
export class Note {
    name: string// name of the note
    items: Item[]// array of items inside the note
    deletedItems: Item[]// array of deleted items( used to undo the deleted ones)
    color: string// color of the note- randomized during creation
    dateOfCreation: Date// date when the note was created
    latestUpdateDate: Date// date when the note was last updated

    constructor(name: string, items: Item[], color: string, dateOfCreation: Date, latestUpdateDate: Date) {
        this.name = name;
        this.items = items;
        this.color = color;
        this.dateOfCreation = dateOfCreation;
        this.latestUpdateDate = latestUpdateDate;
        this.deletedItems = [];
    }
}