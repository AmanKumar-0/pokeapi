import { useState, useEffect } from "react";
import Card from "./Card";
import PokeInfo from "./PokeInfo";
import "./Style.css";

const Main = () => {
  let offset = 0;
  const [pokeData, setPokeData] = useState([]);
  const [pokemon, setPokemon] = useState();
  const [search, setSearch] = useState();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const [fill, setFill] = useState(false);
  const [bookmark, setBookmark] = useState([]);
  // const [b, setB] = useState(false);

  const List = async () => {
    try {
      setLoading(true);
      const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;
      const searchRes = await fetch(url);
      const searchData = await searchRes.json();
      const finalData = searchData.results;
      console.log(finalData);
      setPokeData((pokeData) => [...pokeData, ...finalData]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    offset += 10;
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      List();
    }
  };

  const searchData = async (e) => {
    e.preventDefault();
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${search}`;
      const searchRes = await fetch(url);
      const searchData = await searchRes.json();
      // console.log(searchData);
      // setPokeData(searchData);
      setPokemon(searchData);
    } catch (error) {
      console.log(error);
    }
  };

  const filter = async (e) => {
    e.preventDefault();

    try {
      setFill(true);
      setPokeData([]);
      const url = `https://pokeapi.co/api/v2/type/${type}`;
      const searchRes = await fetch(url);
      const searchData = await searchRes.json();
      const finalData = searchData.pokemon;
      setPokeData(finalData);
    } catch (error) {
      console.log(error);
    }
  };
  const showBookmark = (bookmark) => {
    // setB(true);
    console.log("Hi", pokeData, bookmark);
    setPokeData(bookmark);
  };

  const newBookmark = (data) => {
    console.log(data);
    setBookmark(data);
  };

  useEffect(() => {
    List();
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log(pokeData);
  }, [pokeData]);

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          className="input"
          placeholder="Search Your Fav Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        ></input>
        <button type="submit" onClick={searchData}>
          Search
        </button>
      </div>
      <div className="filter">
        <input
          type="text"
          value={type}
          placeholder="Type of pokemon -type-1,2,3..."
          onChange={(e) => setType(e.target.value.toLowerCase())}
        ></input>
        <button type="submit" onClick={filter}>
          Submit
        </button>

        <button className="bookmark" onClick={() => showBookmark(bookmark)}>
          Show Bookmark
        </button>
      </div>

      <div className="container">
        <div className="left-container">
          {loading ? (
            <h1>Loading....</h1>
          ) : (
            pokeData?.map((poke) => (
              <Card
                poke={poke}
                fill={fill}
                infoPokemon={(poke) => setPokemon(poke)}
                // bookmark={b && bookmark}
              />
            ))
          )}
        </div>
      </div>

      <div className="right-container">
        {/* {loading ? <h1>Loading</h1>: */}
        <PokeInfo data={pokemon} bookInfo={(data) => newBookmark(data)} />
        {/* {console.log(bookmark)} */}
        {/* } */}
      </div>
    </div>
  );
};

export default Main;
