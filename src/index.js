import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './utils/Websocket'
import TopNavbar from './component/navbar/TopNavbar';
import { Layout } from 'antd';

class Index extends React.Component {
    render() {
        return (
            <Layout>
                <TopNavbar />
            </Layout>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));