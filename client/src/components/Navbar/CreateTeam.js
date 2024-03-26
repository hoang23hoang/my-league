import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateTeam() {
    const [nameTeam, setNameTeam] = useState('');
    const [colorShirt, setColorShirt] = useState('');
    const [players, setPlayers] = useState([]);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [place, setPlace] = useState('');
    const [showPlayers, setShowPlayers] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    alert('You need to log in to access this page.');
                    window.location.href = '/auth/login';
                }
            } catch (error) {
                console.error('Error checking token:', error);
            }
        };

        checkToken();
    }, []);

    const handleAddPlayer = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/find/players?phone=${emailOrPhone}`);
            if (response.data) {
                setPlayers([...players, response.data]);
                setEmailOrPhone('');
                setShowPlayers(true);
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
                alert('Bạn phải đăng nhập để tạo team !');
                window.location.href = '/auth/login'; 
                return;
            }
            const teamData = { nameTeam, colorShirt, place, players };
            const response = await axios.post('http://localhost:3001/teams/createTeam', teamData, {
                headers: { authorization: `Bearer ${token}` }
            });

            setNameTeam('');
            setColorShirt('');
            setPlace('');
            setPlayers([]);
            setShowPlayers(false);
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

    const handleRemovePlayer = (index) => {
        const updatedPlayers = [...players];
        updatedPlayers.splice(index, 1);
        setPlayers(updatedPlayers);
        if (updatedPlayers.length === 0) {
            setShowPlayers(false); 
        }
    };

    return (
        <div className="create-team-container" >
            <div className="team-creation-section">
                <h1>Create Team</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label-create'>Team Name:</label>
                        <input type="text" value={nameTeam} onChange={(e) => setNameTeam(e.target.value)} />
                    </div>
                    <div>
                        <label className='label-create'>Color Shirt:</label>
                        <input type="text" value={colorShirt} onChange={(e) => setColorShirt(e.target.value)} />
                    </div>
                    <div>
                        <label className='label-create'>Place:</label>
                        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
                    </div>
                    <div>
                        <label className='label-create'>Add player by phone:</label>
                        <input type="text" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} />
                        <button type="button" className='button-add' onClick={handleAddPlayer}>Add Player</button>
                    </div>
                    <button  className='button-create' type="submit">Create Team</button>
                </form>
            </div>
            {showPlayers && (
                <div className="player-management-section">
                    <h2>Players</h2>
                    {players.map((player, index) => (
                        <div key={index} className='box-player'>
                            <p>Name: {player.namePlayer}</p>
                            <p>Email: {player.email}</p>
                            <p>Phone: {player.phone}</p>
                            <p>Age: {player.age}</p>
                            <p>
                                Shirt Number: 
                                <input type="text" value={player.shirtNumber || ''} onChange={(e) => handleShirtNumberChange(e, index)} />
                            </p>
                            <button className='button-remove' onClick={() => handleRemovePlayer(index)}>Remove Player</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
