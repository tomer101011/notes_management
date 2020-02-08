import React from 'react';
import { Note } from '../classes/Note';
import { Item } from '../classes/Item';
import { Redirect } from 'react-router-dom';


export class Store {

    //generate a hex string representing a random color from the colorList
    generateRandomColor = () => {
        return this.colorList[Math.floor(Math.random() * this.colorList.length)];
    }

    //return a randomized true/false
    //used only for the notes initialized in notesList array
    generateRandomTrueFalse = () => {
        return Math.floor(Math.random() * 2) === 1;
    }

    //the pool of colors that will be randomized
    colorList: string[] = ['#FBE4BE', '#cfc', '#ccf', '#f5bf81', '#fab6f1', '#b6f5fa'];

    notesList: Note[] = [
        new Note('Buy for home',
            [new Item('bread', this.generateRandomTrueFalse()),
            new Item('milk', this.generateRandomTrueFalse())], this.generateRandomColor(), new Date(), new Date()),

        new Note('Chores to do',
            [new Item('wash dishes', this.generateRandomTrueFalse()),
            new Item('make caffe', this.generateRandomTrueFalse()),
            new Item('throw garbage', this.generateRandomTrueFalse())], this.generateRandomColor(), new Date(), new Date()),

        new Note('Do homework',
            [new Item('Math', this.generateRandomTrueFalse()),
            new Item('Computers', this.generateRandomTrueFalse()),
            new Item('English', this.generateRandomTrueFalse())], this.generateRandomColor(), new Date(), new Date())
    ];

    max_amount_of_notes: number = 10;// the max amount of notes

    currentNote: number = -1;//the current note the user chose to edit

    deletedNotes: Note[] = [];//array of deleted notes( used to undo the deleted ones)

    //redirect function to another page depending on path and if you want to redirect- true or not- false
    doRedirect = (path: string, changePage: boolean) => {
        if (changePage)
            return <Redirect to={path} />
    }

    //delete the chosen note( index of note from noteList array)
    deleteNote = (index: number) => {
        //get the deleted note and push it to the deletedNotes array
        let deletedNote = this.notesList.splice(index, 1)[0];
        this.deletedNotes.push(deletedNote);
    }

    //deete the chosen item( index of item from the items array of the current chosen note)
    deleteItem = (index: number) => {
        //get the deleted item and push it to the deletedItems array of the current chosen note
        let deletedItem = this.notesList[this.currentNote].items.splice(index, 1)[0];
        this.notesList[this.currentNote].deletedItems.push(deletedItem);
        this.notesList[this.currentNote].latestUpdateDate = new Date();// update the latest update date
        //push an empty object and pop it again to re- render the component again( observer component)
        this.notesList.push(Object(undefined));
        this.notesList.pop();
    }

    //undo the deleted note and return it to notesList array
    undoDeletedNote = () => {
        //if the deletedNotes array is empty
        if (this.deletedNotes.length === 0)
            alert('There are no deleted notes left');

        //else if the maximux notes that are present are above the max amount of notes
        else if (this.notesList.length >= this.max_amount_of_notes)
            alert('Cannot undo. Maximum notes reached');

        //else return the deleted note back to notesList array
        else {
            let deletedNote = this.deletedNotes.pop() as Note;
            this.notesList.push(deletedNote);
        }
    }

    //undo the deleted item and return it to deletedItems array of the current note
    undoDeletedItem = () => {
        //if the deletedItems array of the current note is empty
        if (this.notesList[this.currentNote].deletedItems.length === 0)
            alert('There are no deleted items left');

        //else return the deleted item back to deletedItems array of the current note
        //and update the latest update date
        else {
            let deletedItem = this.notesList[this.currentNote].deletedItems.pop() as Item;
            this.notesList[this.currentNote].items.push(deletedItem);
            this.notesList[this.currentNote].latestUpdateDate = new Date();
            this.notesList.push(Object(undefined));
            this.notesList.pop();
        }
    }

    //save the note automatically when you change anything inside it
    //get the index of the element you want to change and whether the element is an item or the name of the note
    saveNote = (index: number, isItem: boolean) => {

        //if it is an item of the note you want to change
        if (isItem) {
            //get the checkbox and item input elements
            let itemTextElement = document.getElementById('t' + index) as HTMLInputElement;
            let itemCheckboxElement = document.getElementById('i' + index) as HTMLInputElement;

            //if there is a value inside the input text element, then update the item
            if (itemTextElement.value !== '')
                this.notesList[this.currentNote].items[index].name = itemTextElement.value;
            //else the input is empty and update using the previous text- the placeholder one
            else
                this.notesList[this.currentNote].items[index].name = itemTextElement.placeholder;

            //update checked variable of the item- true or false
            this.notesList[this.currentNote].items[index].isChecked = itemCheckboxElement.checked;
        }

        //else you want to change the name of the note
        else {
            //get the name input element of the note
            let noteNameElement = document.getElementById('n' + this.currentNote) as HTMLInputElement;
            //if there is a value inside the input text element, then update the name of the note
            if (noteNameElement.value !== '')
                this.notesList[this.currentNote].name = noteNameElement.value;
            //else the input is empty and update using the previous text- the placeholder one
            else
                this.notesList[this.currentNote].name = noteNameElement.placeholder;
        }
        //after that, update the latest update date
        this.notesList[this.currentNote].latestUpdateDate = new Date();
    }

    //add a new note no notesList array
    addNote = () => {
        //if you have reached the maximum amount of notes
        if (this.notesList.length >= this.max_amount_of_notes)
            alert('You have reached the maximum amount of notes');

        //else generate a random color to the note and add the note
        else {
            let randomColor = this.generateRandomColor();
            this.notesList.push(new Note('New note',
                [], randomColor, new Date(), new Date()));
        }
    }

    //add a new item to the current selected note and update the note to the latest date
    addItem = () => {
        this.notesList[this.currentNote].items.push(new Item('New item', false));
        this.notesList[this.currentNote].latestUpdateDate = new Date();
        //push an empty object and pop it again to re- render the component again( observer component)
        this.notesList.push(Object(undefined));
        this.notesList.pop();
    }
}