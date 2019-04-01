import React, { Component } from 'react';
import '../styles/Header.css';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            pseudo: true,
        }
    }
    componentDidMount() {
        this.setState({pseudo : false});
    }

    logout = () =>{
        console.log('remove');
        this.componentDidMount();
        localStorage.clear();
        //this.props.history.push('/');
    };

    render() {
        const pseudo = localStorage.getItem('pseudo');
        const name = pseudo === null ? '' : pseudo;

        return (
            <div className="navbar">
                <i className="fab fa-phoenix-squadron fa-3x co"/>
                <div className="menu col-10">
                    {localStorage.getItem('token') !== null ?
                        <div>
                        <a href="/home">Accueil</a>
                        <a href="/series">Ma liste</a>
                        <a href="/Profil">Profil de {name}</a>
                        </div> : <a href="/home">Accueil</a>
                    }
                </div>
                <div className="profil">
                    <a href="/"><i className="fas fa-user fa-2x" onClick={this.logout}/></a>
                </div>
            </div>
        );
    }
}

export default Header;
