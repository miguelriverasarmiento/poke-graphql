import { gql } from "@apollo/client"
import client from "../../apollo-client"
import Head from "next/head"
import styles from '../../styles/Home.module.css'

export default function Pokemon({ pokemon, sprite }) {
    console.log(pokemon, sprite)

    return(
        <div className={styles.container_details}>
            <Head>
                <title>{pokemon.name}</title>
            </Head>
            <section>
                <h1 className={styles.poke_title}>{pokemon.name}</h1>
                <h4 className={styles.idPoke}>Id: {pokemon.id}</h4>
                <img src={sprite} alt={pokemon.name} className={styles.poke_img} />
                <h2 className={styles.title_types}>Types</h2>
                <ul className={styles.types_ul}>
                    {pokemon.pokemon_v2_pokemontypes.map((type) => {
                        return <li className={styles.li_poke} key={type.pokemon_v2_type.name}>{type.pokemon_v2_type.name}</li>
                    })}
                </ul>

                <h2 className={styles.title_stats}>Stats</h2>
                <ul className={styles.stats_ul}>
                    {pokemon.pokemon_v2_pokemonstats.map((stat) => {
                        return <li className={styles.li_stats} key={stat.pokemon_v2_stat.name}>
                            {stat.pokemon_v2_stat.name}: {stat.base_stat}
                                </li>
                    })}
                </ul>
            </section>
        </div>
    )
}

export async function getServerSideProps({params}){
    const pokemonSprite = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`)
    const sprite = pokemonSprite.url

    const { data } = await client.query({
        query: gql`
            query GetPokemon {
                pokemon_v2_pokemon(where: {id: {_eq: ${params.id}}}) {
                id
                name
                pokemon_v2_pokemonstats {
                    base_stat
                    pokemon_v2_stat {
                    name
                    }
                }
                    pokemon_v2_pokemontypes {
                        pokemon_v2_type {
                    name
                    }
                    }
                }
            }
        `
    })
    return {
        props: {
          pokemon: data.pokemon_v2_pokemon[0],
          sprite
        }
      }
    }
