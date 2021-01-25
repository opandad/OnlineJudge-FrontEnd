import React from 'react'
import ReactDOM from 'react-dom'
import {TopNavbar} from './component/navbar/TopNavbar'
import {Footer} from './component/Footer'

import 'bootstrap/dist/css/bootstrap.min.css'

class Index extends React.Component{
    render(){
        return(
            <div>
                <TopNavbar />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));