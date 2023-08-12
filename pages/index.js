import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from '../styles/Home.module.css'
import {getCurrentSearch} from "./api/hello"

export default function Home({ sprite }) {
  const searchInput = useRef(null);
  const [pokemon, setPokemon] = useState([]);
  const [pokemonName, setPokemonName] = useState([]);
  const [pokemonId, setPokemonId] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [pokeNameSearch, setPokeNameSearch] = useState({});
  const [page, setPage] = useState(1);
 
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=15&offset=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.results);
        setPokemonName(data.results.map((pokemon) => pokemon.name));
        setPokemonId(data.results.map((pokemon) => pokemon.url.split('/')[6]));
      })
  }, [page])
  
  const handleOnChange = (e) => {
    e.preventDefault();
    const currentSearch = searchInput.current.value;
    setCurrentSearch(currentSearch);
  }

  const handleOnKeyDown = (e) => {
    if(e.key !== 'Enter') return;
    searchInput.current.value = "";
    getCurrentSearch(currentSearch)
    .then((data) => setPokeNameSearch(data))
    .catch((error) => console.log(error));
    }

    const handlePage = (next) => {
      if(!pokemon.previous && page + next <= 0) return;
      if(!pokemon.next && page + next >= 65) return;
      setPage(page + next);
    }
  
    return (
      <main className={styles.container_index}>
        <h1 className={styles.title}>Pokemon First Generation</h1>
        <input
          className={styles.inputPoke}
          ref={searchInput}
          type="text" 
          placeholder="Buscar Pokemon..." 
          onChange={handleOnChange} 
          onKeyDown={handleOnKeyDown} 
        />
         {Object.entries(pokeNameSearch).length !== 0 ? (
            <ul className={styles.list}>
              <li key={pokeNameSearch.id} className={styles.AllLi}>
                <Link href={`/pokemon/${pokeNameSearch.id}`} className={styles.theLink}>
                  {pokeNameSearch.name}
                </Link>
              </li>
            </ul>
          ) :
            <ul className={styles.list}>
            {pokemon.map((pokemon, index) =>
              <li key={index} className={styles.AllLi}>
                <Link href={`/pokemon/${pokemonId[index]}`} className={styles.theLink}>
                  {pokemonName[index]}
                </Link>
              </li>
            )}
          </ul>
          }
          <section className={styles.buttonSection}>
            <button  onClick={() => handlePage(-1)}>Prev</button>
              | {page} |
            <button  onClick={() => handlePage(1)}>Next</button>
          </section>
      </main>
    );
  }
