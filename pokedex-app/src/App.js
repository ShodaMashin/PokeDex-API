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

    // loads a paginated list of pokemon from URL
    loadList(url) {
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({ pokemon: data, });
        })
        .catch(console.log)
    }

    // click handle method for selecting a pokemon
    selectPokemon(pokemon){
        this.setState({ selected: pokemon, });
    }

    // creates and returns a list of pokemon components for display of paginated list
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

    // creates and returns an array of pokemon type JSX elements for a pokemon
    getTypes(pokemon) {
        let types = [];
        for(let i = 0; i < pokemon.types.length; i++) {
            const type = pokemon.types[i].type.name;
            types.push(
                <span
                    className={"b-outline type type-" + type}
                    key={type}
                >
                    {type}
                </span>
            );
        }
        return types;
    }

    render () {
        let sprite, title, types, stats;

        if(this.state.selected !== ' ') {
            const pokemon = this.state.selected;
            sprite = <img
                className="pokemon-sprite-large"
                src={pokemon.sprites.front_default} alt="sprite"
            />;
            let id = ("00" + pokemon.id).slice(-3);
            let name = pokemon.name;
            title =
            <div className="pokemon-title">
                <div className="pokemon-id b-outline">{id}</div>
                <div className="pokemon-name">{name}</div>
            </div>;
            types = this.getTypes(pokemon);
            let height = pokemon.height;
            let weight = pokemon.weight;
            stats =
            <div className="pokemon-title height-weight position-relative">
                <div className="pokemon-height row justify-content-between">
                    <div className="col-auto">HT</div>
                    <div className="col-auto">{height}</div>
                </div>
                <div className="pokemon-weight row justify-content-between">
                    <div className="col-auto">WT</div>
                    <div className="col-auto">{weight}</div>
                </div>
            </div>;
        }

        return (
            <div className="App">
                <div className="container-fluid pokedex-banner b-outline">
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
                                {sprite}
                            </div>
                            <div className="col-7">
                                {title}
                                {types}
                                {stats}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
