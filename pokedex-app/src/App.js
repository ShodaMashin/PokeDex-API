import React, {Component} from 'react';
import './App.css';
import {Pokemon} from './pokemon.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            pokemon:' '
        }
    }

    componentDidMount() {
        // fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20')
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
        .then(res => res.json())
        .then((data) => {
            this.setState({ pokemon: data, });
        })
        .catch(console.log)
    }

    renderPokedex() {
        let pokemonList = [];
        if (this.state.pokemon.results) {
            console.log(this.state.pokemon.results)
            this.state.pokemon.results.forEach(pokemon => pokemonList.push(<Pokemon url={pokemon.url}/>));
        }

        return pokemonList;
    }

    renderPokemon(pokemon) {
        let pokemonData;

        fetch(pokemon.url)
        .then(res => res.json())
        .then((data) => {
            pokemonData = data;
        })
        .catch(console.log)

        return pokemonData.id;
    }

    render () {
        return (
            <div className="App">
                <div className="container-fluid pokedex-banner">
                    Pokedex
                </div>
                <div className="container-fluid pokedex-banner-bottom"></div>
                <div className="pokedex-grid">
                    <div className="row">
                        {this.renderPokedex()}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
