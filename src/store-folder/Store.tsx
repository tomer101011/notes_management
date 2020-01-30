import { Note } from '../classes/Note';
import { Item } from '../classes/Item';

export class Store {

    notesList = [
        new Note('To buy',
            [new Item('bread'),
            new Item('milk')], new Date(), new Date()),

        new Note('chores',
            [new Item('wash dishes'),
            new Item('finish homework')], new Date(), new Date())
    ];

    
}