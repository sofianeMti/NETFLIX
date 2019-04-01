import React, { Component } from 'react';
import '../styles/Archive.css';


class Archive extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <div className="archive">
                <h1 className="titre7">Vos Archives</h1>
            </div>
        );
    }
}

export default Archive;
