import React from 'react';
import { Note } from '../classes/Note';
import { Item } from '../classes/Item';
import { Redirect } from 'react-router-dom';


export class Store {

    colorList: string[] = ['#FBE4BE', '#cfc', '#ccf', '#f5bf81', '#fab6f1', '#b6f5fa'];

    generateRandomColor = () => {
        return this.colorList[Math.floor(Math.random() * this.colorList.length)];
    }

    generateRandomTrueFalse = () => {
        return Math.floor(Math.random() * 2) === 1;
    }

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

    undoDeleted = () => {
        let deletedNote = this.deletedNotes.pop();

        if (deletedNote === undefined)
            alert('There are no deleted notes left');

        else if (this.notesList.length >= 10)
            alert('Cannot undo. Maximum notes reached');

        else
            this.notesList.push(deletedNote);
    }

    addNote = () => {
        if (this.notesList.length >= 10)
            alert('You have reached the maximum amount of notes');

        else {
            let randomColor = this.generateRandomColor();
            this.notesList.push(new Note('New Note',
                [], randomColor, new Date(), new Date()));
        }
    }
}