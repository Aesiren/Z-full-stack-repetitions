let addMovie = async (title, main_character, year_released) => {
  let res = await fetch('http://localhost:8080/movies/new', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      main_character: main_character,
      year_released: year_released
    })
  })

}

let deleteMovie = async (key) => {
  let res = await fetch(`http://localhost:8080/movies/delete/${key}`, {
    method: "DELETE"
  })

}

export { addMovie, deleteMovie };