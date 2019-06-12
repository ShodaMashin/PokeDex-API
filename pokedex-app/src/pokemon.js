import React, {Component} from 'react';

// A pokemon on the grid view of the pokedex
export class Pokemon extends Component {
    constructor(props){
        super(props);
        this.state={
            data:' '
        }
    }

    componentDidMount() {
        fetch(this.props.url)
        .then(res => res.json())
        .then((data) => {
            this.setState({ data: data, });
        })
        .catch(console.log)
    }

    render() {
        let id;
        let sprite;

        if(this.state.data !== ' '){
            id = ("00" + this.state.data.id).slice(-3);
            sprite = this.state.data.sprites.front_default;
        }

        return(
            <a
                className="pokemon-box"
                onClick={() => this.props.onClick(this.state.data)}
                href="javascript:void(0)"
            >
                {id}<br></br>
                <img className="pokemon-sprite-small" src={sprite} alt="sprite" />
            </a>);
    }
}
