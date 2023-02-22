import { Responsive, WidthProvider } from "react-grid-layout"
import React, { useState, useContext, useEffect } from "react"
import { Navigate , useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { UserContext } from "../../contexts/userContext"
import './dashbaord.scss'

class Card extends React.Component {
	render() {
		return(
			<div className="card">
				<h2>{this.props.title}</h2>
				<div className="line" style={{backgroundColor: this.props.bgc}}></div>
				<p>{this.props.content}</p>
                <Link href = {this.props.link}></Link>
			</div>
		)
	}
}

class Link extends React.Component {
	render() {
		return(
			<a href={this.props.href}>{this.props.text}</a>
		)
	}
}

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			yellow: '#fcd000',
			blue: '#0ebeff',
			green: '#47cf73',
			purple: '#ae63e4'
		}
	}
	render() {
		return(
			<div className="container">
				<Card title="Add Employees" bgc={this.state.yellow} content="Add your Employees here" link='/addEmployee'/>
				<Card title="Show Employees" bgc={this.state.blue} content="Show my Employees"/>
				<Card title="Search Employee" bgc={this.state.green} content="Search an Employee here"/>
				<Card title="Edit Profile" bgc={this.state.purple} content="Edit your Profile"/>
			</div>
		)
	}
}

const Dashboard = ()=> {
    const [cookies, setCookie, removeCookie] = useCookies(["nbk"]);
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(()=> {
        if(cookies['nbk']) navigate("/dashboard")
        else navigate("/signin")
    }, [cookies])

    return (<div>
        <h1>Dashboard</h1>
        <div className="card-list">
            <App/>
        </div>
    
        
              
            


    </div>);
}
export default Dashboard;


/*
    add Employees
    search employees
    show your Employees
    Edit your Profile
*/