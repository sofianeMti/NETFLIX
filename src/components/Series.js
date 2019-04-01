import React, { Component } from 'react';
import '../styles/Series.css'
import axios from "axios";
import {Alert} from "reactstrap";


class Series extends Component {
    constructor(props){
        super(props);

        this.state = {
            data : [],
            visible: false,
            archive: "",
            ArchiveDelete: false,
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount() {
        const tokens = localStorage.getItem('token');
        const idMember = localStorage.getItem('IdMember');

        if(tokens !== null){
            axios.post('http://localhost:3000/series', {data: idMember})
                .then(response => {
                    console.log(response.data.data.shows);
                    this.setState({data : response.data.data.shows});
                });
        }
    }

    /////////////////////////////////////////////////////////////////////Delete une serie aux serie ajouté

    minus = (e) =>{

        //supression d'une serie
        const id = e.target.getAttribute('data-key');
        const tokens = localStorage.getItem('token');
        console.log('ok');
        axios.post('http://localhost:3000/delete', {
            id : id,
            token: tokens
        }).then(response => {
            //remet à jour le render
            this.componentDidMount();

            //alerte
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

        });
    };

    /////////////////////////////////////////////////////////////////////Info d'une serie


    info = (event) =>{
        const id = event.target.getAttribute('data-key');
        this.props.history.push('/serie/'+id);
    };

    /////////////////////////////////////////////////////////////////////Archive d'une serie

    archive = (e) =>{
        console.log('archive');
        const  id  = e.target.getAttribute('data-key');
        console.log(id);
        const token = localStorage.getItem('token');
        axios.post('/archive', {
            id : id,
            token : token
        }).then(response => {

            this.setState({archive : response.data.show.user.archived});

            //alerte
            this.setState({
                ArchiveDelete : true
            });
            setTimeout(
                function() {
                    this.setState({ArchiveDelete: false});
                }
                    .bind(this),
                3000
            );

            this.componentDidMount();
        });
    };

    ///////////////////////////////////////////////////////////////////////Redirection sur la page home

    click = () =>{
        this.props.history.push('/home');
    };

    ListEpisode = (e) =>{
        const id = e.target.getAttribute('data-key');
        console.log(id);
        this.props.history.push('/episodes/serie/'+id);
    };

    render() {
        console.log(this.state.archive);
        return (
            <div className="home1">
                {this.state.data.length !== 0 ? <h1 className="col-3 titres">Vos Séries</h1> : <h1 className="titres2">Aucune série n'a été ajoutée</h1>}
                <Alert className="container col-8 alerts2" color='dark' isOpen={this.state.visible}>Votre série a été supprimée</Alert>
                <Alert className="container col-8 alerts2" color='dark' isOpen={this.state.ArchiveDelete}>Votre série a été archivée</Alert>
                <button className="btn-dark be" onClick={this.click}>Retour Home</button>

                <div className="p-2 BlocFavorite">
                    {
                        this.state.data.map((array, i) =>{
                            const image = array.images.show === null ? '' : array.images.show;
                            const titre = array.title === null ? '' : array.title;
                            return (
                                <div className="d-inline-block sos">
                                    <img className="image1" src={image} key={'image' + i}/>
                                    <p className="titre4" key={'titre' + i}>{titre}</p>
                                    <div className="overlay">
                                        <div className="obt">
                                    <i className="fas fa-minus-circle fa-2x minus" onClick={this.minus} key={'i'+i} data-key={array.id}/>
                                    <i className="fas fa-info-circle fa-2x inf" onClick={this.info} data-key={array.id}/>
                                    {this.state.archive === true ? '' :
                                        <i className="fas fa-archive fa-2x archive" onClick={this.archive} data-key={array.id} />
                                    }
                                        </div>
                                        <i className="far fa-play-circle fa-4x play" onClick={this.ListEpisode} data-key={array.id}/>
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

export default Series;
