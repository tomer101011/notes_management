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
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <p className="headerStyle">Notes Management</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 paddingNotes">
                        <div className="row mx-auto nameStyle borderStyleTop">
                            <div className="col-10 autoBr">
                                asdaaasdaaasdaaasdaaasdaaasdaaasdaasdadsaasdasdadsa
                                </div>
                            <div className="col-2">
                                <button>X</button>
                            </div>
                        </div>
                        <div className="row mx-auto autoBr itemsAreaStyle borderStyleBottom">
                            <div className="col-12">
                                asdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaa
                                </div>
                        </div>
                    </div>
                    <div className="col-lg-4 paddingNotes">
                        <div className="row mx-auto nameStyle borderStyleTop">
                            <div className="col-10 autoBr">
                                asdaaasdaaasdaaasdaaasdaaasdaaasdaasdadsaasdasdadsa
                                </div>
                            <div className="col-2">
                                <button>X</button>
                            </div>
                        </div>
                        <div className="row mx-auto autoBr itemsAreaStyle borderStyleBottom">
                            <div className="col-12">
                                asdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaa
                                </div>
                        </div>
                    </div>
                    <div className="col-lg-4 paddingNotes">
                        <div className="row mx-auto nameStyle borderStyleTop">
                            <div className="col-10 autoBr">
                                asdaaasdaaasdaaasdaaasdaaasdaaasdaasdadsaasdasdadsa
                                </div>
                            <div className="col-2">
                                <button>X</button>
                            </div>
                        </div>
                        <div className="row mx-auto autoBr itemsAreaStyle borderStyleBottom">
                            <div className="col-12">
                                asdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaaasdaa
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}