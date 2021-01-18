import React,{Component} from 'react'
import { Navbar,Nav,NavDropdown,Button,Form,FormControl } from 'react-bootstrap'

/*
    @Title
    
    ~/src/component/navbar/TopNavbar.js
    
    @Description
    
    导航栏
    
    @Func List（这个需打开函数检查）
    
    | func name         | develop  | unit test |
    
    | NavigationBar     |    no    |     no    |
*/
export class TopNavbar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">OnlineJudge</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                    <Button href="http://www.baidu.com">
                        登录
                    </Button>
                    <Button href="http://www.google.com">
                        注册
                    </Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}