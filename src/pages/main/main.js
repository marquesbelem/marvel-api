import React, { Component } from "react";
import api from "../../services/api";
import './styles.css';
import md5 from 'md5';
import keys  from "../../keys";
import { GiBookshelf } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
import Tooltip from '@material-ui/core/Tooltip';

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
         console.log(characters); 
  
        return (
            <div className="list">
               {characters.map(persona =>(
                   <article className="item" key={persona.id} style={{backgroundImage: `url(${persona.thumbnail.path+"."+persona.thumbnail.extension})` }}>
                       <div className="title">
                            <h1>{persona.name}</h1>
                       </div>
                       <div className="infos">
                           <Tooltip title="Comics" arrow>
                            <label>
                                <GiBookCover/> {persona.comics.available}
                            </label> 
                           </Tooltip>
                           <Tooltip title="Series" arrow>
                            <label>
                                <GiBookshelf/> {persona.series.available}
                            </label> 
                           </Tooltip>
                       </div>
                   </article>
               ))}
            </div>
        ); 
    }
}