import React, {Component} from 'react';

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
            console.log(this.state.data);
        })
        .catch(console.log)
    }

    render() {
        let id;
        let sprite;

        if(this.state.data != ' '){
            id = this.state.data.id;
            sprite = this.state.data.sprites.front_default;
        }

        return(
            <div className="pokemon-box">
                {id}<br></br>
                <img className="pokemon-sprite-small" src={sprite} alt="sprite" />
            </div>);
    }
}
