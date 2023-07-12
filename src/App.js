import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';


function App() {


  // Para guardar el token y establecerlo en cada fetch
  const [csrfToken, setCSRFToken] = useState('');

  useEffect(() => {

    const fetchCSRFToken = async () => {

      try {

        const response = await fetch("http://127.0.0.1:8000/preprocesos/csrf_token");
        const data = await response.json();
        setCSRFToken(data.csrfToken);
    
      } catch (error) {
    
        console.error(error);
    
      }

    };

    fetchCSRFToken();

  }, [csrfToken])

  // Para traer datos con el método GET para una vista dada

  const [projects, setProjects] = useState([]);

  useEffect((csrfToken) => {

    const getRequest = async (csrfToken, callback) => {

      try {
        
        const response = await fetch('http://127.0.0.1:8000/preprocesos/mostrar_prjs_terr', {
          method: 'GET',
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });


        const data = await response.json();
        const array = JSON.parse(data.prjs);
        callback(array);
  
      } catch (error) {
  
        console.error(error);
  
      }
  
    };

    const myCallback = (element) => {
      setProjects(element);
    };

    getRequest(csrfToken, myCallback);
  
  }, [])

  const postRequest = async (csrfToken, my_data) => {

    try {

      const response = await fetch('http://127.0.0.1:8000/preprocesos/api/rcbr_args_prjs_trr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({data: my_data}),
      });

      const data = await response.json();
      console.log(data);

    } catch (error) {

      console.error(error);

    }
  };

  postRequest(csrfToken, projects);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {projects.map((project, index) => {
            return <li key={index}>{project.fields.name} (en {project.fields.file}): {project.fields.detalles}</li>
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
