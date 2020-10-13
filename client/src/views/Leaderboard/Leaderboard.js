import React,{Component} from "react";
import PropTypes from "prop-types";
import "./index.css";
import "./Leaderboard.css";

class Leaderboard extends React.Component{

    constructor(){
        super();
        this.state = {
            list: []
        }
        this._clickRecent=this._clickRecent.bind(this);
    }
    componentDidMount(){
        const fetchInit = {
            method: 'GET',
            mode: 'cors'
        };
        fetch('${ this.props.apiURL', fetchInit)
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    list:data
                });
            })
            .catch(err =>console.log('fetch error : ', err))
    }

    _clickRecent(e) {
        let sorted = this.state.list.sort((a, b) => b.recent - a.recent);
        this.setState(sorted);
    }

    render(){
        let userlist = this.state.list.map((user, i) => <User username={user.username} rank={i+1} recent={user.recent}/>);
    
        return(
            <div className="container">
                <LeaderboardHeader />
                <ColumnHeader onClick={this.clickRecent}/>
                {userlist}
            </div>
        )
    }
}

const LeaderboardHeader = () => {
    return(
        <div className="leadheader">
            <h1>The game has ended</h1>
            <h2> You have placed Xth</h2>
        </div>
    )
}

const ColumnHeader = ({onClick}) => (
    <div className="colheader">
        <div className="Place">
            <h2>#</h2>
        </div>
        <div className="Nickname">
            <h2>Nickname</h2>
        </div>
        <div className="Recent">
            <h2>Last Game</h2>
        </div>
    </div>
);

ColumnHeader.propTypes = {
        onClick: PropTypes.func
}

const User = ({ place, nickname, recent}) => {
    return(
        <div className="users">
            <div className="Place">
                <h3>{place}</h3>
            </div>
            <div className="Nickname">
                <h3>{nickname}</h3>
            </div>
            <div className="Recent">
                <h3>{recent}</h3>
            </div>
        </div>
    )
}
User.propTypes = {
    place: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    recent: PropTypes.number.isRequired
}

export default Leaderboard;