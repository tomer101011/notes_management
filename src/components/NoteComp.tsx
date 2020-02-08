import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../classes/Item';
import { Store } from '../store-folder/Store';
import *  as ROUTES from '../constants/routes';
import { observer } from 'mobx-react';

interface IState {
    changePage: boolean;//a variable when you want to change the page- true or stay- false
}

interface IProps {
    store: Store;// the store where all the data and functions related to it is located
    location: any;
}

class NoteComp extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.keydownFunction = this.keydownFunction.bind(this);// binding the keydownFunction for keyboard uses
        if (this.props.location.state !== undefined)//passes the id(index) of the note in the array from List component
            this.props.store.currentNote = this.props.location.state.id;
    }

    state: IState = {
        changePage: false
    }

    keydownFunction(event: any) {
        //if the key is ESC- code 27, then go to home page
        //F5 key code to avoid rendering problems- F5 will initialize currentNote index back to original one
        if (event.keyCode === 27 || event.keyCode === 116)
            this.setState({ changePage: true });
    }
    //if the user presses the specified key, then the escFunction is triggered
    componentDidMount() {
        document.addEventListener("keydown", this.keydownFunction, false);
    }
    //Remove Listener to avoid memory leaks
    componentWillUnmount() {
        document.removeEventListener("keydown", this.keydownFunction, false);
    }

    //build an html array for each item
    builtList = (items: Item[]) => {
        let itemTags = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].isChecked)//if the item is checked, then check the GUI element( blue element)
                itemTags.push(
                    <div className="row" key={i}>
                        <div className="col-2 disablePadding">
                            <img onClick={() => { this.props.store.deleteItem(i) }} className="deleteIconStyle margindeleteIcon undoMargin" title="Delete Item" src={require(`../pictures/deleteIcon.png`)} alt="" />
                        </div>
                        <div className="col-8 disablePadding">
                            <div key={i} className="autoBr list-group-item">
                                &nbsp;
                                <label className="addCursor">
                                    <input onClick={() => this.props.store.saveNote(i, true)} defaultChecked id={"i" + i} type="checkbox" />
                                    <span title="Check item" className="list-group-item-text">
                                        <i className="fa fa-fw"></i>
                                        <input onChange={() => this.props.store.saveNote(i, true)} className="EditItemStyle" id={"t" + i} placeholder={items[i].name} type="text" />
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                );
            else// else the item won't be checked
                itemTags.push(
                    <div className="row" key={i}>
                        <div className="col-2 disablePadding">
                            <img onClick={() => { this.props.store.deleteItem(i) }} className="deleteIconStyle margindeleteIcon undoMargin" title="Delete Item" src={require(`../pictures/deleteIcon.png`)} alt="" />
                        </div>
                        <div className="col-8 disablePadding">
                            <div className="autoBr list-group-item">
                                &nbsp;
                                <label className="addCursor">
                                    <input onClick={() => this.props.store.saveNote(i, true)} id={"i" + i} type="checkbox" />
                                    <span title="Check item" className="list-group-item-text">
                                        <i className="fa fa-fw"></i>
                                        <input onChange={() => this.props.store.saveNote(i, true)} className="EditItemStyle" id={"t" + i} placeholder={items[i].name} type="text" />
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                );
        }
        return itemTags;
    }

    //load list of items with it's GUI to the screen
    loadList = () => {
        if (this.props.store.currentNote >= 0 &&
            this.props.store.currentNote < this.props.store.notesList.length) {

            let items = this.props.store.notesList[this.props.store.currentNote].items;
            let itemTags = this.builtList(items);
            return (
                <div style={{ width: "100%", backgroundColor: this.props.store.notesList[this.props.store.currentNote].color }}
                    className="col-md-12 editBorderStyleBottom disablePadding">

                    <div className="btn-group-justified mx-auto addNoteStyle" role="group" aria-label="Basic example">
                        <button onClick={() => this.props.store.undoDeletedItem()} className=" btn btn-info marginButton">Undo deleted</button>
                        <button onClick={() => this.props.store.addItem()} className="btn btn-success marginButton">Add new item</button>
                    </div>

                    <div style={{ width: "80%" }} className="list-group marginBottomStyle paddItems mx-auto checkbox-list-group">
                        {itemTags.map(item => { return item })}
                    </div>
                    {this.loadDate()}
                </div>
            );
        }
    }

    //load the date when the note was changed to the screen
    loadDate = () => {
        let note = this.props.store.notesList[this.props.store.currentNote];

        if (note.deletedItems.length > 0 || note.items.length > 0)
            return (<p>Latest Update- {note.latestUpdateDate.toLocaleString()}</p>);

        else
            return (<p>Date Created- {note.dateOfCreation.toLocaleString()}</p>);
    }

    //delete the current selected note and go back to home page
    deleteNote = () => {
        this.props.store.deleteNote(this.props.store.currentNote);
        this.setState({ changePage: true });
    }

    //load the name of the note to the screen
    loadNoteName = () => {
        //if the current note doesn't exceed the boundary of the notesList array
        if (this.props.store.currentNote >= 0 &&
            this.props.store.currentNote < this.props.store.notesList.length)

            return (
                <input onChange={() => this.props.store.saveNote(this.props.store.currentNote, false)} className="EditItemStyle nameEditStyle" id={"n" + this.props.store.currentNote}
                    placeholder={this.props.store.notesList[this.props.store.currentNote].name} type="text" />
            );
    }

    render() {
        return (
            <div>
                {this.props.store.doRedirect(ROUTES.HOME, this.state.changePage)}
                <div className="row">
                    <div className="col-md-12">
                        <p className="headerStyle">Edit Note</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Link to={ROUTES.HOME}><button className="goBackStyle newNoteStyle">Go back</button></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 paddingHelp">
                        <button onClick={() => alert("You can press ESC to go back\nNote is saved automatically")} className="helpTip mx-auto"
                            title="You can press ESC to go back. Note is saved automatically.">?</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 paddingNotes">
                        <div className="row mx-auto editStyle noteWidth editBorderStyleTop">
                            <div className="col-2"></div>
                            <div className="col-8 autoBr noteNameStyle">
                                {this.loadNoteName()}
                            </div>
                            <div className="col-2">
                                <img onClick={() => this.deleteNote()} className="deleteNote" title="Delete Note" src={require(`../pictures/closeIcon.png`)} alt="" />
                            </div>
                        </div>
                        <div className="row mx-auto noteWidth">
                            {this.loadList()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default observer(NoteComp);