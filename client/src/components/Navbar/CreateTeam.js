import React, { useState } from 'react';
import axios from 'axios';

export default function CreateTeam() {
    const [nameTeam, setNameTeam] = useState('');
    const [logo, setLogo] = useState('');
    const [colorShirt, setColorShirt] = useState('');
    const [players, setPlayers] = useState([]);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [place, setPlace] = useState('');

    const handleAddPlayer = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/find/players?phone=${emailOrPhone}`);
            console.log(response.data);
            if (response.data) {
                setPlayers([...players, response.data]); 
                setEmailOrPhone(''); 
            }
        } catch (error) {
            console.error('Error add player:', error);
            alert('Failed to add player. Please try again.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                alert('You need to log in to create a team.');
                return;
            }
            const teamData = { nameTeam, logo, colorShirt, place, players };
            const response = await axios.post('http://localhost:3001/teams/createTeam', teamData,
            {headers: {authorization:  `Bearer ${token}`}});
            console.log(response.data);

            setNameTeam('');
            setLogo('');
            setColorShirt('');
            setPlace('');
            setPlayers([]);
            alert('Team created successfully!');
        } catch (error) {
            console.error('Error creating team:', error);
            alert('Failed to create team. Please try again.');
        }
    };

    const handleShirtNumberChange = (event, index) => {
        const updatedPlayers = [...players];
        updatedPlayers[index].shirtNumber = event.target.value;
        setPlayers(updatedPlayers);
    };

    return (
        <div className="create-team-container">
        <div className="create-team-form">
            <h1>Create Team</h1>
            <form onSubmit={handleSubmit} className="team-form">
                <label htmlFor="nameTeam" className="team-label">Team Name:</label>
                <input type="text" id="nameTeam" name="nameTeam"
                    value={nameTeam}
                    onChange={(e) => setNameTeam(e.target.value)}
                    className="team-input" />
                <br />
                <label htmlFor="logo" className="team-label">Logo:</label>
                <input type="text" id="logo" name="logo"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    className="team-input" />
                <br />
                <label htmlFor="colorShirt" className="team-label">Color Shirt:</label>
                <input type="text" id="colorShirt" name="colorShirt"
                    value={colorShirt}
                    onChange={(e) => setColorShirt(e.target.value)}
                    className="team-input" />
                <br />
                <label htmlFor="place" className="team-label">Place:</label>
                <input type="text" id="place" name="place"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    className="team-input" />
                <br />
                <label htmlFor="emailOrPhone" className="team-label">Add player by phone:</label>
                <input type="text" id="emailOrPhone" name="emailOrPhone"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="team-input" />
                <button type="button" onClick={handleAddPlayer} className="add-player-button">Add Player</button>
                <br />
                {players.length > 0 && (
                    <div className="players-container">
                        <h3 className="players-heading">Players:</h3>
                        {players.map((player, index) => (
                            <div key={index} className="player-details">
                                <h4 className="player-heading">Player {index + 1}:</h4>
                                <p className="player-info">Name: {player.namePlayer}</p>
                                <p className="player-info">Email: {player.email}</p>
                                <p className="player-info">Phone: {player.phone}</p>
                                <p className="player-info">Age: {player.age}</p>
                                <p className="player-info">Shirt Number: <input type="text"
                                    value={player.shirtNumber}
                                    onChange={(e) => handleShirtNumberChange(e, index)}
                                    className="shirt-number-input" /></p>
                            </div>
                        ))}
                    </div>
                )}
                <button type="submit" className="create-team-button">Create Team</button>
            </form>
        </div>
    </div>
    
    );
}
