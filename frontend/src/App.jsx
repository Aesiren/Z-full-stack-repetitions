import { useState, useEffect } from 'react'
import './App.css'
import { addMovie, deleteMovie } from './api/api.js';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [count, setCounter] = useState(1);

  useEffect(() => {
    const getFavorites = async () => {
      let data = await fetch('http://localhost:8080/movies').then((res) => res.json());
      setFavorites(data);
    }
    getFavorites();
    console.log(favorites)
  }, [count])



  async function addData(formData) {
    const title = formData.get('title');
    const main_character = formData.get('main_character');
    const year_released = formData.get('year_released');

    let data = await addMovie(title, main_character, year_released);
    console.log(data);
    setCounter(count + 1);
  }

  async function removeData(key) {
    let data = await deleteMovie(key);
    console.log(data);
    setCounter(count - 1);
  }

  return (
    <>
      <div className="data">
        <table>
          <tr>
            <th>Movie Title:</th>
            <th>Main Character:</th>
            <th>Year Released:</th>
            <th>Remove</th>
          </tr>
          {favorites.map((movie, key) => {
            return (
              <tr>
                <td>{movie.title} </td>
                <td>{movie.main_character}</td>
                <td>{movie.year_released}</td>
                <td><button onClick={() => removeData(movie.id)}>Delete</button></td>
              </tr>
            )
          })}
        </table>
      </div>

      <div className="new-form">
        <form className="add-data" action={addData}>
          <label>Movie Title:</label>
          <input type="text" name="title" required="true" />
          <label>Main Character:</label>
          <input type="text" name="main_character" required="true" />
          <label>Year Released:</label>
          <input type="text" name="year_released" required="true" />
          <button className="submit-button" type="submit">Add</button>
        </form>

      </div>
    </>
  )
}

export default App
