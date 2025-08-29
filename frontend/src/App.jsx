import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      let data = await fetch('http://localhost:8080/movies').then((res) => res.json());
      setFavorites(data);
    }
    getFavorites();
    console.log(favorites)
  }, [])

  return (
    <>
      <div>
        <ol>
          <li>
            {favorites.map((movie) => {
              return (
                <div>
                  {movie.id}
                  <ul>
                    <li>{movie.title} </li>
                    <li>{movie.main_character}</li>
                    <li>{movie.year_released}</li>
                  </ul>
                </div>
              )
            })}
          </li>
        </ol>
      </div>
    </>
  )
}

export default App
