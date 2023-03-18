import { gql } from "@apollo/client"
import client from "../../apollo-client"
import Head from "next/head"
//import styles from '../../styles/Pokemon.module.css'

export default function Pokemon({ pokemon, sprite }) {
    console.log(pokemon, sprite)

    return <h1>That's right!</h1>
}

export async function getServerSideProps({params}){
    const pokemonSprite = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`)
    const sprite = pokemonSprite.url

    const { data } = await client.query({
        query: gql`
            query GetPokemon {
                pokemon_v2_pokemon(where: {id: {_lte: 151}}) {
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
