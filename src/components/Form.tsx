import React from 'react';
import { Store } from '../store-folder/Store';

// interface IState {
//   review: string;
//   stars: number;
// }

interface IProps {
    store: Store;
}

export default class Form extends React.Component<IProps> {

    render() {
        return (
            <div className="formSection">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="headerStyle">Notes Management</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 paddingNotes">
                        <div className="row mx-auto nameStyle">
                            <div className="col-md-12">
                                asdaa
                            </div>
                        </div>
                        <div className="row mx-auto autoBr itemsAreaStyle">
                            <div className="col-md-12">
                                asdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaa
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 paddingNotes">
                        <div className="row mx-auto nameStyle">
                            <div className="col-md-12">
                                asdaa
                            </div>
                        </div>
                        <div className="row mx-auto autoBr itemsAreaStyle">
                            <div className="col-md-12">
                                asdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaa
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 paddingNotes">
                        <div className="row mx-auto nameStyle">
                            <div className="col-md-12">
                                asdaa
                            </div>
                        </div>
                        <div className="row mx-auto autoBr itemsAreaStyle">
                            <div className="col-md-12">
                                asdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaa
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}