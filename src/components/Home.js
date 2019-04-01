import React, { Component } from 'react';
import '../styles/Home.css'
import axios from "axios";
import { Alert } from 'reactstrap'




class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            visible : false,
            visibles : false,
            test1: [],
        }
    }

    ///////////////////////////////////////////////////////////

    componentDidMount() {
        axios.get('http://localhost:3000/home')
            .then(res => {
                console.log(res);
                this.setState({
                    data: res.data.series.shows
                });
            });
    }

    //////////////////////////////////////////////////////////Ajout d'une serie


    Plus = (event) => {

        event.preventDefault();

        if(localStorage.getItem('token') !== null){

            //ALERTE AJOUTS D'UNE SERIES
            this.setState({
                visible : true
            });
            setTimeout(
                function() {
                    this.setState({visible: false});
                }
                    .bind(this),
                3000
            );

            //ENVOIE KEY
            const id = event.target.getAttribute('data-key');
            const tokens = localStorage.getItem('token');
            console.log(tokens);
            axios.post('http://localhost:3000/home',{
                data: id,
                token: tokens
            }).then(response => {
                console.log(response.data);
                this.setState({test1 : response.data});
            });
        }else{
            this.setState({
                visibles : true
            });

            setTimeout(
                function() {
                    this.setState({visibles: false});
                }
                    .bind(this),
                3000
            );
        }
    };

    //////////////////////////////////////////////////////////////Info d'une serie

    info = (event) =>{
        const id = event.target.getAttribute('data-key');
        this.props.history.push('/serie/'+id);
    };

    //////////////////////////////////////////////////////////////List des episodes

    ListEpisode = (e) =>{
        const id = e.target.getAttribute('data-key');
        console.log(id);
        this.props.history.push('/episodes/serie/'+id);
    };


    render() {
        console.log(localStorage.getItem('token'));
        console.log(this.state.data);
        return (
            <div className="home">
                <h1 className="titre">Séries à voir</h1>
                <Alert className="container col-8 alerts" color='dark' isOpen={this.state.visible}>Votre serie a été ajoutée</Alert>
                <Alert className="container col-8 alerts" color='dark' isOpen={this.state.visibles}>Veuillez vous connecter pour ajouter une série</Alert>
                <div className="p-2 BlocFilm">
                    {
                        this.state.data.map((array, i) =>{
                            const image = array.images.show === null ? '' : array.images.show;
                            const titre = array.title === null ? '' : array.title;
                            return (
                                <div className="d-inline-block so">
                                    <img className="image" src={image} key={'image' + i}/>
                                    <p className="titre3" key={'titre' + i}>{titre}</p>
                                    <div className="overlay">
                                        <div className="blocBtn">
                                            <i className="fas fa-plus-circle fa-2x plus" onClick={this.Plus} data-key={array.id}/>
                                            <i className="fas fa-info-circle fa-2x infos" onClick={this.info} data-key={array.id}/>
                                        </div>
                                        <i className="far fa-play-circle fa-4x ob" onClick={this.ListEpisode} data-key={array.id}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Home;
