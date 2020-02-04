import React from 'react';
import { Note } from '../classes/Note';
import { Item } from '../classes/Item';
import { Redirect } from 'react-router-dom';


export class Store {

    generateRandomColor = () => {
        return this.colorList[Math.floor(Math.random() * this.colorList.length)];
    }

    generateRandomTrueFalse = () => {
        return Math.floor(Math.random() * 2) === 1;
    }

    colorList: string[] = ['#FBE4BE', '#cfc', '#ccf', '#f5bf81', '#fab6f1', '#b6f5fa'];

    notesList: Note[] = [
        new Note('Buy for home',
            [new Item('bread', this.generateRandomTrueFalse()),
            new Item('milk', this.generateRandomTrueFalse())], this.generateRandomColor(), new Date(), new Date()),

        new Note('Chores to do',
            [new Item('wash dishes', this.generateRandomTrueFalse()),
            new Item('make caffe', this.generateRandomTrueFalse()),
            new Item('throw garbage', this.generateRandomTrueFalse())], this.generateRandomColor(), new Date(), new Date()),

        new Note('Do homeworks',
            [new Item('Math', this.generateRandomTrueFalse()),
            new Item('Computers', this.generateRandomTrueFalse()),
            new Item('English', this.generateRandomTrueFalse())], this.generateRandomColor(), new Date(), new Date())
    ];

    max_amount_of_notes: number = 10;

    currentNote: number = -1;

    deletedNotes: Note[] = [];

    doRedirect = (path: string, changePage: boolean) => {
        if (changePage)
            return <Redirect to={path} />
    }

    deleteNote = (index: number) => {
        let deletedNote = this.notesList.splice(index, 1)[0];
        this.deletedNotes.push(deletedNote);
    }

    deleteItem = (index: number) => {
        let deletedItem = this.notesList[this.currentNote].items.splice(index, 1)[0];
        this.notesList[this.currentNote].deletedItems.push(deletedItem);
        this.notesList[this.currentNote].latestUpdateDate = new Date();
        this.notesList.push(Object(undefined));
        this.notesList.pop();
    }

    undoDeletedNote = () => {
        if (this.deletedNotes.length === 0)
            alert('There are no deleted notes left');

        else if (this.notesList.length >= this.max_amount_of_notes)
            alert('Cannot undo. Maximum notes reached');

        else {
            let deletedNote = this.deletedNotes.pop() as Note;
            this.notesList.push(deletedNote);
        }
    }

    undoDeletedItem = () => {
        if (this.notesList[this.currentNote].deletedItems.length === 0)
            alert('There are no deleted items left');

        else {
            let deletedItem = this.notesList[this.currentNote].deletedItems.pop() as Item;
            this.notesList[this.currentNote].items.push(deletedItem);
            this.notesList[this.currentNote].latestUpdateDate = new Date();
            this.notesList.push(Object(undefined));
            this.notesList.pop();
        }
    }

    saveNote = () => {

        let noteNameElement = document.getElementById('n' + this.currentNote) as HTMLInputElement;
        if (noteNameElement.value !== '')
            this.notesList[this.currentNote].name = noteNameElement.value;

        for (let i = 0; i < this.notesList[this.currentNote].items.length; i++) {
            let itemTextElement = document.getElementById('t' + i) as HTMLInputElement;
            let itemCheckboxElement = document.getElementById('i' + i) as HTMLInputElement;

            if (itemTextElement.value !== '')
                this.notesList[this.currentNote].items[i].name = itemTextElement.value;

            this.notesList[this.currentNote].items[i].isChecked = itemCheckboxElement.checked;
        }
        this.notesList[this.currentNote].latestUpdateDate = new Date();
        alert('Item saved successfully!');
        this.notesList.push(Object(undefined));
        this.notesList.pop();
    }

    addNote = () => {
        if (this.notesList.length >= this.max_amount_of_notes)
            alert('You have reached the maximum amount of notes');

        else {
            let randomColor = this.generateRandomColor();
            this.notesList.push(new Note('New note',
                [], randomColor, new Date(), new Date()));
        }
    }

    addItem = () => {
        this.notesList[this.currentNote].items.push(new Item('New item', false));
        this.notesList[this.currentNote].latestUpdateDate = new Date();
        this.notesList.push(Object(undefined));
        this.notesList.pop();
    }
}