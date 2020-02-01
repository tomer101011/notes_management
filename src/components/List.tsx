import React from 'react';
import { Note } from '../classes/Note';
import { Item } from '../classes/Item';
import { Store } from '../store-folder/Store';
import { Link } from 'react-router-dom';

interface IProps {
    id: number;
    note: Note;
    store: Store;
}

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

const loadDate = (note: Note) => {
    if (note.items.length === 0)
        return (<p>Date Created- {note.dateOfCreation.toLocaleString()}</p>);

    else
        return (<p>Latest Update- {note.latestUpdateDate.toLocaleString()}</p>);
}

const List: React.FC<IProps> = (props) => {
    return (
        <div className="col-lg-4 paddingNotes">
            <div className="row mx-auto nameStyle borderStyleTop">
                <div className="col-2"></div>
                <div className="col-8 autoBr noteNameStyle">
                    {props.note.name}
                </div>
                <div className="col-2">
                    <img onClick={() => props.store.deleteNote(props.id)} className="deleteNote" title="Delete Note" src={require(`../pictures/closeIcon.png`)} alt="" />
                </div>
            </div>
            <div className="row mx-auto autoBr itemsAreaStyle">
                <div className="col-12">
                    <Link className="LinkStyle" title="Edit note" to="/note">
                        {loadList(props.note.items)}
                    </Link>
                </div>
            </div>
            <div className="row mx-auto itemsAreaStyle borderStyleBottom">
                <div className="col-12 dateStyle">
                    {loadDate(props.note)}
                </div>
            </div>
        </div>
    )
}
export default List;



//  <div className="list-group checkbox-list-group">
//     <div className="list-group-item">&nbsp;<label><input type="checkbox" /><span className="list-group-item-text"><i className="fa fa-fw"></i> Default</span></label></div>
//     <div className="list-group-item list-group-item-success"><label>&nbsp;<input type="checkbox" /><span className="list-group-item-text"><i className="fa fa-fw"></i> Success</span></label></div>
//     <div className="list-group-item list-group-item-info"><label>&nbsp;<input type="checkbox" /><span className="list-group-item-text"><i className="fa fa-fw"></i> Info</span></label></div>
//     <div className="list-group-item list-group-item-warning"><label>&nbsp;<input type="checkbox" /><span className="list-group-item-text"><i className="fa fa-fw"></i> Warning</span></label></div>
//     <div className="list-group-item list-group-item-danger"><label>&nbsp;<input type="checkbox" /><span className="list-group-item-text"><i className="fa fa-fw"></i> Danger</span></label></div>
// </div>