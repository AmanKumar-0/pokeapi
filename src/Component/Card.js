import React, { useEffect, useState } from "react";
import "./Style.css";

const Card = ({ poke, infoPokemon, fill }) => {
  const [pokeInfo, setPokeInfo] = useState();

  const list = async () => {
    try {
      const search = await fetch(poke.url);
      const searchRes = await search.json();
      setPokeInfo(searchRes);
    } catch (error) {
      console.log(error);
    }
  };

  const newList = async () => {
    try {
      const search = await fetch(poke.pokemon.url);
      const searchRes = await search.json();
      setPokeInfo(searchRes);
    } catch (error) {
      console.log(error);
    }
  };
  // const bookmark = async () => {};

  useEffect(() => {
    {
      fill && newList();
    }
    {
      !fill && list();
    }
    // {
    //   bookmark && !fill && newList();
    // }
  }, [fill]);

  return (
    <>
      <div className="poke_card" onClick={() => infoPokemon(pokeInfo)}>
        <img src={pokeInfo?.sprites?.front_default} alt="" />
        {pokeInfo?.name}
      </div>
    </>
  );
};

export default Card;
