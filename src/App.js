// src/App.js
import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>User Registration Form with Validation</h1>
      </div>
      <main>
        <RegistrationForm />
      </main>
      <footer>
        <p>Week 6 Laboratory Assessment &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App;