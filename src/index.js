import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './utils/Websocket'
import TopNavbar from './component/navbar/TopNavbar';
import Footer from './component/Footer'
import { Layout } from 'antd';

import 'antd/dist/antd.less';
import { Login } from './page/Login';

class Index extends React.Component {
    render() {
        return (
            <Layout>
                <TopNavbar />
                <Layout.Content style={{ padding: '0 50px' }}>contain
                </Layout.Content>
                <Footer />
            </Layout>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));