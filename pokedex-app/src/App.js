import React, {Component} from 'react';
import './App.css';
import {Pokemon} from './pokemon.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            pokemon:' ',
            selected:' '
        }
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
        .then(res => res.json())
        .then((data) => {
            this.setState({ pokemon: data, });
        })
        .catch(console.log)
    }

    loadList(url) {
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({ pokemon: data, });
        })
        .catch(console.log)
    }

    selectPokemon(pokemon){
        this.setState({ selected: pokemon, });
    }

    renderPokedex() {
        let pokemonList = [];
        if (this.state.pokemon.results) {
            this.state.pokemon.results.forEach(
                pokemon => pokemonList.push(
                    <Pokemon
                        url={pokemon.url}
                        key={pokemon.name}
                        onClick={(data) => this.selectPokemon(data)}
                    />
                )
            );
        }

        return pokemonList;
    }

    getTypes(pokemon) {
        for(let i = 0; i < pokemon.types.length; i++) {

        }
    }

    render () {
        let sprite, id, name, types, height, weight;

        if(this.state.selected !== ' ') {
            const pokemon = this.state.selected;
            sprite = pokemon.sprites.front_default;
            id = pokemon.id;
            name = pokemon.name;
            types = this.getTypes(pokemon);
        }

        return (
            <div className="App">
                <div className="container-fluid pokedex-banner">
                    Pokedex
                </div>
                <div className="container-fluid pokedex-banner-bottom"></div>
                <div className="row">
                    <div className="pokedex-grid col-auto">
                        <div className="row pokedex-row">
                            {this.renderPokedex()}
                        </div>
                        <div className="row
                            justify-content-around
                            position-relative
                            pokedex-nav"
                        >
                            <button
                                className="pokedex-nav-button col-4"
                                onClick={() => this.loadList(this.state.pokemon.previous)}
                            > Prev
                            </button>
                            <button
                                className="pokedex-nav-button col-4"
                                onClick={() => this.loadList(this.state.pokemon.next)}
                            > Next
                            </button>
                        </div>
                    </div>
                    <div className="pokedex-data col-auto">
                        <div className="row">
                            <div className="col-5">
                                <img className="pokemon-sprite-large" src={sprite} alt="sprite" />
                            </div>
                            <div className="col-7">
                            </div>
                        </div>
                        <div className="row">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
