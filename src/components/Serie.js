import React, { Component } from 'react';
import '../styles/Serie.css'
import axios from "axios";



class Serie extends Component {
    constructor(props){
        super(props);

        this.state = {
            data : [],
            image : "",
            archive : "",
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.post('http://localhost:3000/serie', {
            id: id
        }).then(response =>{
            this.setState({data : response.data.show, image : response.data.show.images.show});
        })
    }

    //////////////////////////////////////////////////////////////////////////////////////////////Redirection vers la page home

    click = () =>{
      this.props.history.push('/home');
      console.log('ok');
    };


    render() {
        return (
            <div>
                <div className="p-2 BlocF">
                    <p className="col-6 titre6">Nombre de Saisons : {this.state.data.seasons} & Nombre d'épisodes :  {this.state.data.episodes}</p>
                    <div className="b">
                        <button className="btn-dark bee" onClick={this.click}>Retour Home</button>
                        <p className="titres5">{this.state.data.title}</p>
                        <img className="image5" src={this.state.image}/>
                        <br/><br/>
                        <p className="col-9 description">{this.state.data.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Serie;
