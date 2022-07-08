
import './App.css';
import { useEffect, useState } from "react";
import video from "./food.mp4";
import MyRecipesComponent from './MyRecipesComponent';

function App() {

  const MY_ID = "6d2a53d5";
  const MY_KEY = "655c08146c3a90640eefec24a8a39f55";

  const [mySearch, setMySearch] = useState('');
  const [myRecipes, setMyRecipes] =useState([]);
  const [wordSubmitted, setWordSubmitted] = useState('avocado')


  useEffect(() => {
    fetchData();
  }, [wordSubmitted])

  const fetchData = async() => {
    const response = await fetch(`https://api.edamam.com/search?q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
    const data = await response.json();
    console.log(data.hits)
    setMyRecipes(data.hits);
  }

  const myRecipeSearch = (e) => {
    console.log(e.target.value);
    setMySearch(e.target.value)
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  
return(
  <div className='App'>
    <div className='container'>
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
      <h1>Find a Recipe</h1>
    </div>

    <div className='container'>
    <form onSubmit={finalSearch}>
      <input className='search' placeholder='Search...' onChange={myRecipeSearch} value={mySearch}>
      </input>
    </form>
    </div>
    


    <div className='container'> 
    <button>
      <img src='https://img.icons8.com/color/344/fry.png' width="50px" className='icons' alt='icon'/>
    </button>
    </div>

    <div>
    {myRecipes.map(element => (
      <MyRecipesComponent 
      label={element.recipe.label} 
      image={element.recipe.image} 
      calories={element.recipe.calories}
      ingredients={element.recipe.ingredientLines}/>
    ) )}
    </div>

  </div>
)
}

export default App;
