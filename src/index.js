import React from 'react'
import ReactDOM from 'react-dom'
import {TopNavbar} from './component/navbar/TopNavbar'
import {LoginForm} from './component/form/LoginForm'

import 'bootstrap/dist/css/bootstrap.min.css'

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date:new Date()};
    }

    componentDidMount(){
        this.timerID = setInterval(()=>this.tick(), 1000);
    }
    
    componentDidUnMount(){
        clearInterval(this.timerID);
    }

    tick(){
        this.setState({
            date: new Date()
        });
    }

    render(){
        return(
            <div>
                <h1>这是一个主页。</h1>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

class Index extends React.Component{
    render(){
        return(
            <div>
                <TopNavbar />
                <Clock />
                <LoginForm />
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));