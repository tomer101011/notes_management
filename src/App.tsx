import React from 'react';
import './App.css';
import './cssFiles/NotesStyle.css';
import { Store } from './store-folder/Store';
import Form from './components/Form';
import { decorate, observable, /*action, computed*/ } from 'mobx';
import 'bootstrap/dist/css/bootstrap.min.css';

decorate(Store, {
  notesList: observable, //observable are states
});

const appData = new Store();

const App: React.FC = () => {
  return (
    <div className="App container">
      <Form store={appData} />
    </div >
  );
}

export default App;
