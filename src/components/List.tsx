import React from 'react';
import { Note } from '../classes/Note';
import { Item } from '../classes/Item';
import { Store } from '../store-folder/Store';
import { Link } from 'react-router-dom';
import *  as ROUTES from '../constants/routes';

interface IProps {
    id: number;
    store: Store;
}

//build an html array of items
const builtList = (items: Item[]) => {
    let itemTags = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].isChecked)
            itemTags.push(<li key={i} className="list-group-item itemStyle activeStyle">{items[i].name}</li>);
        else
            itemTags.push(<li key={i} className="list-group-item itemStyle notActiveStyle">{items[i].name}</li>);
    }
    return itemTags;
}

//load the list of items to the note
const loadList = (items: Item[]) => {
    if (items.length === 0)
        return (<p className="messageStyle">Click to edit note</p>);

    else {
        let itemTags = builtList(items);
        return (
            <ul className="list-group listStyle">
                {itemTags.map(item => { return item })}
            </ul>
        );
    }
}

//load the date when the note was changed to the screen
const loadDate = (note: Note) => {
    if (note.deletedItems.length > 0 || note.items.length > 0)
        return (<p>Latest Update- {note.latestUpdateDate.toLocaleString()}</p>);

    else
        return (<p>Date Created- {note.dateOfCreation.toLocaleString()}</p>);
}

const List: React.FC<IProps> = (props) => {
    return (
        <div className="col-lg-4 paddingNotes">
            <div className="row mx-auto nameStyle borderStyleTop">
                <div className="col-2">
                    <img onClick={() => props.store.undoDeletedNote()} className="undoStyle" title="Undo deleted" src={require(`../pictures/undoIcon.png`)} alt="" />
                </div>
                <div className="col-8 autoBr noteNameStyle">
                    {props.store.notesList[props.id].name}
                </div>
                <div className="col-2">
                    <img onClick={() => props.store.deleteNote(props.id)} className="deleteNote" title="Delete Note" src={require(`../pictures/closeIcon.png`)} alt="" />
                </div>
            </div>
            <div style={{ background: props.store.notesList[props.id].color }} className="row mx-auto autoBr itemsAreaStyle">
                <div className="col-12">
                    <Link to={{
                        pathname: ROUTES.NOTE,
                        state: { id: props.id }
                    }} className="LinkStyle" title="Edit note">

                        {loadList(props.store.notesList[props.id].items)}
                    </Link>
                </div>
            </div>
            <div style={{ background: props.store.notesList[props.id].color }} className="row mx-auto itemsAreaStyle borderStyleBottom">
                <div className="col-12 dateStyle">
                    {loadDate(props.store.notesList[props.id])}
                </div>
            </div>
        </div>
    )
}
export default List;