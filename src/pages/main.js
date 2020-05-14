import React, { Component } from "react";
import api from "../services/api";
import './styles.css';
//import { Link } from 'react-router-dom';
import md5 from 'md5';
import keys  from "../keys";

export default class Main extends Component {
    state = {
        ts: Math.floor(Math.random() * (100 - 20) + 20),
        info: {},
        characters: []
    };

    componentDidMount(){
        this.loadCharacters();
    }
    
    loadCharacters = async () => {
        const response = await api.get(`/characters?ts=${this.state.ts}&apikey=${keys.PUBLIC}&hash=${this.createHash()}`);
        const {results, ...info} = response.data.data; 
        this.setState({characters: results, info});
    }

    createHash = () => {
        return md5(this.state.ts+keys.PRIVATE+keys.PUBLIC);
    }

    render() {
        const { characters } = this.state;
       //console.log(characters);
  
        return (
            <div className="list">
               {characters.map(persona =>(
                   <article className="item" key={persona.id} style={{backgroundImage: `url(${persona.thumbnail.path+"."+persona.thumbnail.extension})` }}>
                       {/* <img src={persona.thumbnail.path+"."+persona.thumbnail.extension} alt="Character"/> */}
                       <div className="blur">
                            <h1>{persona.name}</h1>
                       </div>
                   </article>
               ))}
            </div>
        ); 
    }
}