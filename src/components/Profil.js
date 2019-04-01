import React, { Component } from 'react';
import axios from "axios";
import '../styles/Profil.css';
import OutlinedTextFields from "./Input";
import {Alert} from "reactstrap";

class Profil extends  Component{

    constructor(props){
        super(props);

        this.state = {
            ami : [],
            pseudo: '',
            name: [],
            alertA: false,
            alertS: false,
            alertI: false,
            notification: [],
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////Notification

    Receveid = () =>{

        const token = localStorage.getItem('token');
        axios.post('/notif', {token : token})
            .then(response =>{
                this.setState({notification: response.data.users});
                console.log(this.state.notification);

                this.setState({
                    alertI : true
                });
                setTimeout(
                    function() {
                        this.setState({alertI: false});
                    }
                        .bind(this),
                    10000
                );

            })
    };

    /////////////////////////////////////////////////////////////////////////////////////

    componentDidMount() {

        const idMember = localStorage.getItem('IdMember');
        const tokens = localStorage.getItem('token');
        axios.post('http://localhost:3000/profil', {idMember : idMember, token: tokens})
            .then(response =>{
                console.log(response.data.users.login);
                this.setState({ami : response.data.users})
            });

        this.Receveid();
        console.log(this.state.notification);
    }

    /////////////////////////////////////////////////////////////////////////////////////Delete un ami

    Delete = (e)=>{
        const id = e.target.getAttribute('data-key');
        const tokens = localStorage.getItem('token');
        console.log(id);
        axios.post('/supp', {id: id, token : tokens})
            .then(response =>{
                console.log(response);
                this.componentDidMount();
            })
    };

    /////////////////////////////////////////////////////////////////////////////////////search un ami

    Search = (event)=>{
        const pseudo = event.target.value;
        console.log(pseudo);
        this.setState({pseudo : pseudo})
    };

    /////////////////////////////////////////////////////////////////////////////////////Send pseudo au server

    Send = () =>{

       console.log(this.state.pseudo);
       const token = localStorage.getItem('token');
       const pseudo = this.state.pseudo;

       if(pseudo !== ''){
           axios.post('/friend', {emails: pseudo, token : token})
               .then(response =>{
                   console.log(response.data.users);
                   this.setState({pseudo: ''});
                   this.setState({name : response.data.users})
               })
       }else{

           console.log('kokkokok');
           this.setState({
               alertS : true
           });
           setTimeout(
               function() {
                   this.setState({alertS: false});
               }
                   .bind(this),
               10000
           );
       }

     };

    /////////////////////////////////////////////////////////////////////////////////////Ajout d'un ami

    add = (e)=>{
        const id = e.target.getAttribute('data-key');
        const token = localStorage.getItem('token');
        console.log(id);
        this.setState({pseudo : ''});

        axios.post('add', {id : id, token : token})
            .then(response =>{
                console.log(response);
                this.setState({
                    alertA : true
                });
                setTimeout(
                    function() {
                        this.setState({alertA: false});
                    }
                        .bind(this),
                    3000
                );
                this.setState({name : []});
                this.componentDidMount();
            })
    };

    render() {
        console.log(this.state.name.login);
        const pseudo = localStorage.getItem('pseudo');

        return(
            <div className="profilB">
                <h1 className="titreProfil">Profil de {pseudo}</h1>
                <h3 className="vosAmis">vos amis :</h3>
                <Alert className="alertsChamp col-6" color='red' isOpen={this.state.alertS}>Veuillez remplir les champs</Alert>
                {this.state.ami.map((array, i) => {
                        return <div className="pseudo p-4"><h3><span className="nom">{array.login}</span><i className="fas fa-minus plusAmis" onClick={this.Delete} data-key={array.id}/><i
                            className="fas fa-ban plusAmis"/></h3> </div>
                    })}
                    <div className="searchInput" onChange={this.Search}><OutlinedTextFields/><button className="btn-dark sendPseudo" onClick={this.Send}>Send</button></div>

                {this.state.name.map((array, i) =>{
                    return <div>
                        <Alert className="container col-5 alert10" color='dark' isOpen={this.state.alertA}>Vous avez ajouté {array.login}</Alert>
                         <div className="addFriend">
                        <h3><span className="nom2">{array.login}</span><i className="fas fa-plus addLogo" onClick={this.add} data-key={array.id}/></h3>
                    </div>
                    </div>
                })

                }
                {this.state.notification.map((array, i) =>{
                    return  <Alert className="alertsDemande col-6" color='red' isOpen={this.state.alertI}>{array.login} vous a demandé en amie<i className="fas fa-plus addLogo" onClick={this.add} data-key={array.id}/></Alert>
                })

                }
            </div>
        )
    }
}

export default Profil;
