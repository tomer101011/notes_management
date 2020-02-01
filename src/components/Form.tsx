import React from 'react';
import List from './List';
import { Store } from '../store-folder/Store';
import *  as ROUTES from '../constants/routes';

interface IState {
    changePage: boolean;
}

interface IProps {
    store: Store;
}

export default class Form extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.escFunction = this.escFunction.bind(this);
    }

    state: IState = {
        changePage: false
    }

    escFunction(event: any) {
        //if the key is ESC- code 27 or Backspace- code 8, then go to another page
        if (event.keyCode === 27 || event.keyCode === 8) {
            this.setState({ changePage: true });
        }
    }
    //if the user presses ESC, then the escFunction is triggered
    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }
    //Remove Listener to avoid memory leaks
    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    loadNotes = () => {
        return (
            <div className="row">
                {
                    this.props.store.notesList.map((note, i) =>
                        <List key={i} note={note} />
                    )
                }
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.store.doRedirect(ROUTES.NOTE, this.state.changePage)}
                <div className="row">
                    <div className="col-md-12">
                        <p className="headerStyle">Notes Management</p>
                    </div>
                </div>
                {this.loadNotes()}
            </div>
        )
    }
}