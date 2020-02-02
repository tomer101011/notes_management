import React from 'react';
import { Link } from 'react-router-dom';
// import { Note } from '../classes/Note';
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
                                <div className="col-md-12 disablePadding">
                                    <div className="list-group  checkbox-list-group">
                                        <div className=" autoBr list-group-item disableBorderRadiusStyle">&nbsp;<label><input type="checkbox" /><span className="list-group-item-text EditItemStyle"><i className="fa fa-fw"></i> wash dishes</span></label></div>
                                        <div className="autoBr list-group-item list-group-item-success"><label>&nbsp;<input type="checkbox" /><span className="list-group-item-text EditItemStyle"><i className="fa fa-fw"></i> make caffe</span></label></div>
                                        <div className="autoBr list-group-item list-group-item-info"><label>&nbsp;<input type="checkbox" /><span className="list-group-item-text EditItemStyle"><i className="fa fa-fw"></i> throw garbage</span></label></div>
                                        <div className="autoBr list-group-item list-group-item-warning"><label>&nbsp;<input type="checkbox" /><span className="list-group-item-text EditItemStyle"><i className="fa fa-fw"></i> wash dishes</span></label></div>
                                        <div className="autoBr list-group-item editBorderStyleBottom list-group-item-danger"><label>&nbsp;<input type="checkbox" /><span className="list-group-item-text EditItemStyle"><i className="fa fa-fw"></i> wash dishes</span></label></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                // <div className="col-lg-12 mx-auto paddingNotes">
                //     <div className="row mx-auto nameStyle borderStyleTop">
                //         <div className="col-2"></div>
                //         <div className="col-8 autoBr noteNameStyle">
                //             {this.props.store.notesList[this.state.id].name}
                //         </div>
                //         <div className="col-2">
                //             <img onClick={() => this.props.store.deleteNote(this.props.id)} className="deleteNote" title="Delete Note" src={require(`../pictures/closeIcon.png`)} alt="" />
                //         </div>
                //     </div>
                //     <div style={{ background: this.props.note.color }} className="row mx-auto autoBr itemsAreaStyle">
                //     <div className="col-12">
                //             <Link className="LinkStyle" title="Edit note" to="/note">
                //                 {loadList(props.note.items)}
                //             </Link>
                //         </div>
                //     </div>
                //     <div style={{ background: props.note.color }} className="row mx-auto itemsAreaStyle borderStyleBottom">
                //         <div className="col-12 dateStyle">
                //             {loadDate(props.note)}
                //         </div>
                //     </div>
                // </div>
            )
        }
        catch (e) {
            return this.props.store.doRedirect(ROUTES.HOME, !this.state.changePage)
        }
    }
}