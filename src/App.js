import { useState ,useEffect} from 'react';
import './App.css';

const url=`https://pokeapi.co/api/v2/pokemon`;

function App() {
  const [pokeData, setPokeData]= useState([]);
  const[nextUrl,setNextUrl]= useState();
  const[prevUrl,setPrevUrl]= useState();


  const List = async () => {
    try {

      const searchRes = await fetch(url);
      const searchData = await searchRes.json();
      setNextUrl(searchData.next);
      setNextUrl(searchData.previous);
      getPokemon(searchData.results)  
      // console.log(searchData.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getPokemon=async(res)=>{
    res.map(async(item)=>{
      const result= await fetch(item.url);
      const finalData=(result.url);
      console.log(finalData);
    })
  }

     useEffect(() => {
      List();
     }, [])

  return (
    <div className="app">
      <div className="search"></div>
      <div className="container">
      <div className="left-container"></div>
      <div className="right-container"></div>
      </div>
    </div>
  );
}

export default App;
