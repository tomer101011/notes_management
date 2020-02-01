import React from 'react';
import { Note } from '../classes/Note';
import { Item } from '../classes/Item';
import { Redirect } from 'react-router-dom';


export class Store {

    notesList = [
        new Note('Buy for home',
            [new Item('bread'),
            new Item('milk')], new Date(), new Date()),

        new Note('Chores to do',
            [new Item('wash dishes'),
            new Item('make caffe')], new Date(), new Date()),

        new Note('Do homeworks',
            [new Item('Math'),
            new Item('Computers')], new Date(), new Date())
    ];

    doRedirect = (path: string, changePage: boolean) => {
        if (changePage)
            return <Redirect to={path} />
    }

    deleteNote = (index: number) => {
        if (window.confirm('Are you sure you want to delete this note?'))
            this.notesList.splice(index, 1);
    }

    addNote = () => {
        if (this.notesList.length >= 10)
            alert('You have reached the maximum amount of notes');
        else
            this.notesList.push(new Note('New Note',
                [], new Date(), new Date()));
    }
}