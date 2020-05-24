import React, { useState, useEffect } from 'react';
import logo from './mullet.png';
import './App.css';

export default function OtherPages({ page }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 2000);
    }
  });

  if (isLoading) {
      return (
        <div className="App">
          <header className="App-header">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </header>
        </div>
      );
  }

  return (
    <div className="App" data-test={`${page}-page`}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          A {page} in the app.
        </p>
      </header>
    </div>
  );
}
