import React from 'react'
import ReactDOM from 'react-dom'
import ReactBootstrap from 'react-bootstrap'


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
                <h1>这是一个主页222。</h1>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

ReactDOM.render(<Clock />, document.getElementById('root'));

ReactDOM.render(<Index />, document.getElementById('root'));