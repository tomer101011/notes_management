import React from 'react';
import './App.css';
import './cssFiles/NotesStyle.css';
import './cssFiles/EditNoteStyle.css';
import { Store } from './store-folder/Store';
import Form from './components/Form';
import NoteComp from './components/NoteComp';
import { decorate, observable, action } from 'mobx';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import *  as ROUTES from './constants/routes';
import 'bootstrap/dist/css/bootstrap.min.css';


decorate(Store, {
  notesList: observable, //observable are like states
  deleteNote: action,// function that modifies observables
  addNote: action,
  undoDeleted: action,
  addItem: action
});

const appData = new Store();

const App: React.FC = () => {
  return (
    <div className="App container">

      <Router>
        {/* all routing pages */}
        <Switch>
          <Route exact path={ROUTES.HOME} render={(props) => <Form {...props} store={appData} />} />
          <Route exact path={ROUTES.NOTE} render={(props) => <NoteComp {...props} store={appData} />} />
        </Switch>
      </Router>

    </div >
  );
}

export default App;
