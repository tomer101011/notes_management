import React from 'react';
import { Note } from '../classes/Note';
import { Link } from 'react-router-dom';

interface IProps {
    note: Note;
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
                    <img className="deleteNote" title="Delete Note" src={require(`../pictures/closeIcon.png`)} alt="" />
                </div>
            </div>
            <div className="row mx-auto autoBr itemsAreaStyle borderStyleBottom">
                <div className="col-12">
                    <Link className="LinkStyle" title="Edit note" to="/note">
                        <ul className="list-group listStyle">
                            {
                                props.note.items.map((item, i) =>
                                    <li key={i} className="list-group-item itemStyle">{item.name}</li>
                                )
                            }
                        </ul>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default List;