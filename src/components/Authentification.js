import React, { Component } from 'react';
import '../styles/Authentification.css'
import Demo from "./demo";
import axios from "axios";
import { Alert } from 'reactstrap'




class Authentification extends Component {
    constructor(props){
        super();
        this.state = {
            email :'',
            password : '',
            alert: false
        }
    }

    //////////////////////////////////////////Recup email

    email = (event) =>{
      const emails = event.target.value;
        this.setState({
            email: emails
        });
    };

    //////////////////////////////////////////Recup password

    password = (event) =>{
      const passwords = event.target.value;
        this.setState({
            password: passwords
        });
    };

    //////////////////////////////////////////Envoi les data vers server nodejs

    send = (e) =>{
        e.preventDefault();
        if(this.state.email === '' && this.state.password === ''){
            this.setState({
                alert : true
            });
            setTimeout(
                function() {
                    this.setState({alert: false});
                }
                    .bind(this),
                3000
            );
        }else{
            console.log(this.state.email);
            console.log(this.state.password);
            axios.post('http://localhost:3000/', {
                email: this.state.email,
                password: this.state.password
            })
            .then(response =>{
                  console.log(response.data.data);
                localStorage.setItem('IdMember', response.data.data.user.id);
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('pseudo', response.data.data.user.login);
                this.props.history.push('/home');
            });
        }
    };


    render() {
        return (
            <div className="login">
                <Alert className="alerts11 col-6" color='dark' isOpen={this.state.alert}>Veuillez remplir les champs</Alert>
                <div className="form-group col-6 email">
                        <div className="col-sm-10">
                            <input type="email" placeholder="entrez votre pseudo" onChange={this.email} className="form-control-plaintext col-10 input"/>
                            <input type="password"  placeholder="entrez votre mot de passe" onChange={this.password} className="form-control-plaintext col-10 input"/>
                                   <div className="button" onClick={this.send}>
                                       <Demo/>
                                   </div>
                        </div>
                    </div>
            </div>
    );
    }
}

export default Authentification;
