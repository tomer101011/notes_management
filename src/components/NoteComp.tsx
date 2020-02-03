import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../classes/Item';
import { Store } from '../store-folder/Store';
import *  as ROUTES from '../constants/routes';
import { observer } from 'mobx-react';

interface IState {
    changePage: boolean;
}

interface IProps {
    store: Store;
    location: any;
}

class NoteComp extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.keydownFunction = this.keydownFunction.bind(this);
        if (this.props.location.state !== undefined)
            this.props.store.currentNote = this.props.location.state.id;
    }

    state: IState = {
        changePage: false
    }

    keydownFunction(event: any) {
        //if the key is ESC- code 27 or Backspace- code 8, then go to home page
        //F5 key code to avoid rendering problems- F5 will initialize currentNote index back to originial one
        if (event.keyCode === 27 || event.keyCode === 8 || event.keyCode === 116)
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

    builtList = (items: Item[]) => {
        let itemTags = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].isChecked)
                itemTags.push(
                    <div key={i} className="autoBr list-group-item">
                        &nbsp;
                        <label className="addCursor">
                            <input defaultChecked id={"i" + i} type="checkbox" />
                            <span title="Check item" className="list-group-item-text">
                                <i className="fa fa-fw"></i>
                                <input className="EditItemStyle" id={"t" + i} defaultValue={items[i].name} type="text" />
                                <img className="deleteIconStyle undoMargin" title="Undo deleted" src={require(`../pictures/deleteIcon.png`)} alt="" />
                            </span>
                        </label>
                    </div>
                );
            else
                itemTags.push(
                    <div key={i} className="autoBr list-group-item">
                        &nbsp;
                        <label className="addCursor">
                            <input id={"i" + i} type="checkbox" />
                            <span title="Check item" className="list-group-item-text">
                                <i className="fa fa-fw"></i>
                                <input className="EditItemStyle" defaultValue={items[i].name} type="text" />
                                <img className="deleteIconStyle undoMargin" title="Delete Item" src={require(`../pictures/deleteIcon.png`)} alt="" />
                            </span>
                        </label>
                    </div>
                );
        }
        return itemTags;
    }

    loadDate = () => {
        let note = this.props.store.notesList[this.props.store.currentNote];
        if (note.items.length === 0)
            return (<p>Date Created- {note.dateOfCreation.toLocaleString()}</p>);

        else
            return (<p>Latest Update- {note.latestUpdateDate.toLocaleString()}</p>);
    }

    loadList = () => {
        if (this.props.store.currentNote >= 0 &&
            this.props.store.currentNote < this.props.store.notesList.length) {

            let items = this.props.store.notesList[this.props.store.currentNote].items;
            let itemTags = this.builtList(items);
            return (
                <div style={{ width: "100%", backgroundColor: this.props.store.notesList[this.props.store.currentNote].color }}
                    className="col-md-12 editBorderStyleBottom disablePadding">

                    <div className="btn-group-justified mx-auto addNoteStyle" role="group" aria-label="Basic example">
                        <button className=" btn btn-info marginButton">Undo deleted</button>
                        <button onClick={() => this.props.store.addItem()} className="btn btn-success marginButton">Add new item</button>
                        <button className=" btn btn-primary marginButton">Save note</button>
                    </div>

                    <div style={{ width: "80%" }} className="list-group marginBottomStyle paddItems mx-auto checkbox-list-group">
                        {itemTags.map(item => { return item })}
                    </div>
                    {this.loadDate()}
                </div>
            );
        }
    }

    deleteNote = () => {
        this.props.store.deleteNote(this.props.store.currentNote);
        this.setState({ changePage: true });
    }

    loadNoteName = () => {
        if (this.props.store.currentNote >= 0 &&
            this.props.store.currentNote < this.props.store.notesList.length)

            return (
                <input className="EditItemStyle" id={"n" + this.props.store.currentNote}
                    defaultValue={this.props.store.notesList[this.props.store.currentNote].name} type="text" />
            );
    }

    render() {
        return (
            <div>
                {this.props.store.doRedirect(ROUTES.HOME, this.state.changePage)}
                <div className="row">
                    <div className="col-lg-12">
                        <p className="headerStyle">Edit Note</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Link to={ROUTES.HOME}><button className="goBackStyle newNoteStyle">Go back</button></Link>
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