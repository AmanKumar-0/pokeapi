import React, { useEffect, useState } from "react";
import "./Style.css";

const PokeInfo = ({ data, bookInfo }) => {
  const [temp, setTemp] = useState([]);

  const handleBookamrk = (data) => {
    if (temp.includes(data)) {
      setTemp(temp.filter((value) => value !== data));
      // bookInfo(temp);
      return;
    } else {
      setTemp((temp) => [...temp, data]);
      // bookInfo(temp);
    }
  };

  useEffect(() => {
    console.log(temp);
    bookInfo(temp);
  }, [temp]);

  return (
    <div>
      <h1>{data?.name}</h1>
      {data && (
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data?.id}.svg`}
          alt=""
        />
      )}
      {data && (
        <input
          type="checkbox"
          value={data}
          onChange={() => handleBookamrk(data)}
          checked={temp.includes(data)}
        ></input>
      )}
      {/* {console.log(temp)} */}
      {/* {console.log(bookInfo)} */}
      <div className="abilities">
        {data?.abilities.map((poke) => (
          <div className="group">
            <h2>{poke?.ability.name}</h2>
          </div>
        ))}
      </div>
      <div className="base-stat">
        {data?.stats.map((poke) => (
          <h3>
            {poke?.stat.name}:{poke?.base_stat}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default PokeInfo;
