import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../classes/Item';
import { Store } from '../store-folder/Store';
import *  as ROUTES from '../constants/routes';

interface IState {
    changePage: boolean;
}

interface IProps {
    store: Store;
    location: any;
}

export default class NoteComp extends React.Component<IProps, IState> {

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
        if (event.keyCode === 27 || event.keyCode === 8)
            this.setState({ changePage: true });
    }
    //if the user presses ESC, then the escFunction is triggered
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
                            <span title="Check item" className="list-group-item-text EditItemStyle">
                                <i className="fa fa-fw"></i>
                                {items[i].name}
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
                            <span title="Check item" className="list-group-item-text EditItemStyle">
                                <i className="fa fa-fw"></i>
                                {items[i].name}</span>
                        </label>
                    </div>
                );
        }
        return itemTags;
    }

    loadList = (items: Item[]) => {
        let itemTags = this.builtList(items);
        return (
            <div style={{ width: "100%", backgroundColor: this.props.store.notesList[this.props.store.currentNote].color }}
                className="col-md-12 editBorderStyleBottom disablePadding">

                <button className=" btn btn-success addNoteStyle">Add new item</button>
                <div style={{ width: "80%" }} className="list-group marginBottomStyle paddItems mx-auto checkbox-list-group">
                    {itemTags.map(item => { return item })}
                </div>

            </div>
        );
    }

    render() {
        try {
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
                            <Link to={ROUTES.HOME}><button className="btn btn-info newNoteStyle">Go Back</button></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 paddingNotes">
                            <div className="row mx-auto editStyle noteWidth editBorderStyleTop">
                                <div className="col-2"></div>
                                <div className="col-8 autoBr noteNameStyle">
                                    {this.props.store.notesList[this.props.store.currentNote].name}
                                </div>
                                <div className="col-2">
                                    <img className="deleteNote" title="Delete Note" src={require(`../pictures/closeIcon.png`)} alt="" />
                                </div>
                            </div>
                            <div className="row mx-auto noteWidth">
                                {this.loadList(this.props.store.notesList[this.props.store.currentNote].items)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        catch (e) {
            return this.props.store.doRedirect(ROUTES.HOME, !this.state.changePage)
        }
    }
}