import React, { Component } from 'react';
import '../styles/Episodes.css';
import axios from "axios";
import {Alert} from "reactstrap";



class Episodes extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            vue: false,
            visible: false,
            comment: false,
            send:false,
            id:'',
            users: false,
            alerts: false,
        }
    }

    ///////////////////////////////////////////////////////////////////////

    componentDidMount() {
        const {id} = this.props.match.params;
        axios.post('/homes', {id : id})
            .then(response => {
                console.log(response.data.episode.episodes);
                this.setState({data : response.data.episode.episodes})
            })
    }

    //////////////////////////////////////////////////////////////////////Ajoute une serie en vue

    vue = (e) =>{

        const id = e.target.getAttribute('data-key');
        const token = localStorage.getItem('token');
        console.log(id);
        this.setState({vue : true});

        axios.post('/vue', {id : id, token : token})
            .then(response => {

               this.setState({users :response.data.episode.user});
            });

        if(this.state.users !== true){

            console.log('alerts : votre episode a deja été ajouter');

            this.setState({
                alerts : true
            });

            setTimeout(
                function() {
                    this.setState({alerts: false});
                }
                    .bind(this),
                2000
            );

        }

        this.setState({
            visible : true
        });
        setTimeout(
            function() {
                this.setState({visible: false});
            }
                .bind(this),
            2000
        );

    };

    ///////////////////////////////////////////////////////////////////////Comments une serie

    comments = (event) =>{
      this.setState({comment : true});
      const id = event.target.getAttribute('data-key');
    };

    ///////////////////////////////////////////////////////////////////////Redirection sur la page home

    click = () =>{
        this.props.history.push('/home');
    };

    ///////////////////////////////////////////////////////////////////////Envoi d'un commentaire


    send = () =>{
        this.setState({send : true})
    };


    render() {
        console.log(this.state.users);
        //const logo = this.state.vue === true && this.state.data.id !== null ? <div><i className="fas fa-eye-slash fa-2x vue" data-key={this.state.data.id}/><p className="mar">*marqué comme vue</p></div> : <div><i className="fas fa-eye fa-2x vue" onClick={this.vue} data-key={this.state.data.id}/><p className="mar">*marqué comme non vue</p></div>;
        const input = this.state.comment === false && this.state.data.id !== null ? '' :
            <div className="input-group mb-2 send">
                <input type="text" className="form-control col-6" placeholder="Commentez l'épisode"
                       aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button className="btn ui" type="button">Button</button>
                    </div>
            </div>;

        return (
            <div className="epsiode">
                <h1 className="titre7">Liste Episodes</h1>
                <Alert className="container col-8 alerts5" color='dark' isOpen={this.state.visible}>L'épisode a été ajouté aux épisodes vues</Alert>
                <button className="btn-dark be" onClick={this.click}>Retour Home</button>

                {this.state.data.map((array, i) => {
                    return(<div className="container p-4 listEpisode">
                        <button className="btn comments" onClick={this.comments} data-key={array.id}><span className="sp" data-key={array.id}>Commenter</span></button>
                        <h5 className="nbrEpisode">{array.title} - Episode {array.episode}</h5>
                        <p className="descriptionEpisode">{array.description}</p>
                        <p className="dateEpisode">{array.date}</p>
                        {this.state.users.seen !== true  ?
                            <div className="blocVue">
                            <i className="fas fa-eye fa-2x vue" onClick={this.vue} data-key={array.id}/>
                            <p className="mar">*marqué comme non vue</p>
                                {/*{this.state.alerts === true ?
                                    <Alert className="container col-8 alerts5">Episode deja ajouter</Alert> : ''
                                }*/}
                            </div>
                        :
                            <div>
                                <i className="fas fa-eye-slash fa-2x vue"/>
                                <p className="mar">*marqué comme vue</p>
                            </div>
                        }
                        {input}
                    </div>)
                })}
            </div>
        );
    }
}

export default Episodes;
