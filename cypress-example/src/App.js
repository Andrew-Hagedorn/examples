import React, { useState } from 'react';
import logo from './mullet.png';
import './App.css';

function Modal({ close }) {
  return (
      <div 
        className="modal" 
        data-test="modal"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">A useless modal</h5>
              <button type="button" className="close" onClick={close} />
            </div>
            <div className="modal-body">
              <p>Do you want to close this modal?</p>
            </div>
            <div className="modal-footer">
              <button
                 type="button" 
                 className="btn btn-secondary" 
                 data-test="close-button"
                 onClick={close} 
              >
                Close
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

function App() {
  const [isOpen, toggleModal] = useState(false);
  return (
    <div className="App" data-test="first-page">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Do nothing app that tests out cypress.
        </p>
        <button 
          className="btn btn-primary" 
          data-test="open-button"
          onClick={() => toggleModal(true)}
          type="button"
        >
          Open
        </button>
        {isOpen ? <Modal close={() => toggleModal(false)} /> : null}
      </header>
    </div>
  );
}

export default App;
