import '../styles/App.scss';
import data from '../data/data.json';
import {useEffect, useState } from 'react';
import getDataApi from '../services/fetch';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: '',
  });
  const [filter, setFilter] = useState('');
  const [ filterCharacter, setFilterCharacter]= useState ('all')



  
  useEffect(()=>{ 
    getDataApi().then((data) =>{
      setQuotes(data);
  });
}, []); 


  const handleButton = (ev) => {
    ev.preventDefault();
    setQuotes([...quotes, newQuote]);
  };

  const handleFilter = (ev) => {
    setFilter(ev.target.value);
  };

  const handleFilterCharacter =(ev)=> { 
    setFilterCharacter (ev.target.value);
  }

  const handleInputs = (ev) => {
    setNewQuote({ ...newQuote, [ev.target.id]: ev.target.value });
  };

  const htmlData = quotes
    .filter((item) => {
      return item.quote.toLowerCase().includes(filter.toLocaleLowerCase());
    })

    .filter((item)=> { 
      if( filterCharacter === 'all'){ return true;}
      
    return item.character === filterCharacter;
  })

    .map((item, index) => {
      return (
        <li className='main__ul--li' key={index}>
          <p> {`${item.quote} - ${item.character} `} </p>
        </li>
      );
    });

  return (
    <div className="App">
      <header className='header'>
        <h1 className='header__title'>Frases de friends</h1>
        <form className='header__form'>
          <label className='header__form--label'> Filtrar por frase</label>
          <input className='header__form--input'onChange={handleFilter} value={filter}></input>
          <label className='header__form--label'> Filtrar por  personaje </label>
  <select className='header__form--input' onChange={handleFilterCharacter} value= { filterCharacter }> 

    <option value ='all'>Todos</option>
    <option value= 'Ross'>Ross</option>
    <option value= 'Monica'>Monica</option>
    <option value= 'Joey'>Joey</option>
    <option value='Phoebe'>Phoebe</option>
    <option value= 'Chandler'>Chandler</option>
    <option value = 'Rachel'>Rachel</option>
  
  </select>
        </form>
      </header>

      <main className='main'>
        <ul  className='main__ul'>{htmlData}</ul>

        <form>
          <legend> Añadir una nueva frase</legend>
          <label> Frase</label>
          <input
            onChange={handleInputs}
            id="quote"
            value={newQuote.quote}
          ></input>
          <label> Personaje</label>
          <input
            onChange={handleInputs}
            id="character"
            value={newQuote.character}
          ></input>

          <button onClick={handleButton}> Añadir una nueva frase</button>
        </form>
      </main>
    </div>
  );
}

export default App;
