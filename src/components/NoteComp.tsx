import React from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../store-folder/Store';
import *  as ROUTES from '../constants/routes';

// interface IState {
//   review: string;
//   stars: number;
// }

interface IProps {
    store: Store;
}

export default class NoteComp extends React.Component<IProps> {

    render() {
        return (

            <div>
                <Link to={ROUTES.HOME}>aa</Link>
            </div>
        )
    }
}