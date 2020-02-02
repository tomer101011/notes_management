import React from 'react';
import List from './List';
import { Store } from '../store-folder/Store';
import { observer } from 'mobx-react';

interface IProps {
    store: Store;
}

class Form extends React.Component<IProps> {

    loadNotes = () => {
        return (
            <div className="row">
                {
                    this.props.store.notesList.map((note, i) =>
                        <List id={i} key={i} store={this.props.store} />
                    )
                }
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <p className="headerStyle">Notes Management</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button onClick={() => this.props.store.addNote()} className=" btn btn-success newNoteStyle">New note</button>
                            <button onClick={() => this.props.store.undoDeleted()} className=" btn btn-info newNoteStyle">Undo Deleted</button>
                        </div>

                    </div>
                </div>
                {this.loadNotes()}
            </div>
        )
    }
}
export default observer(Form);