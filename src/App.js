import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';


const performFetch = (callback) => {

  fetch("http://127.0.0.1:8000/preprocesos/mostrar_prjs_terr", {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => {

      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed with status: ' + response.status);
      }

    })
    .then(data => {

        const array = Object.values(data);
        callback(array);

    })
    .catch(error => {
        console.error('Error: ', error);
    });

}

function App() {

  const [projects, setProjects] = useState([])

  useEffect(() => {

    const myCallback = (element) => {
      setProjects(element);
    }
    performFetch(myCallback);

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {projects.map((project, index) => {
            return <li key={index}>{project}</li>
          })}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
