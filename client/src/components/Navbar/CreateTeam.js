import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateTeam() {
    const [nameTeam, setNameTeam] = useState('');
    const [colorShirt, setColorShirt] = useState('');
    const [players, setPlayers] = useState([]);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [place, setPlace] = useState('');
    const [showPlayers, setShowPlayers] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    alert('Bạn phải đăng nhập để xem được thông tin này !');
                    navigate('/auth/login');
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
                navigate('/auth/login');
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
            <h1 style={{ display: 'flex', justifyContent: 'center', fontFamily: "Angkor", fontSize: 50, margin: 50 }}>Create Team</h1>
            <div className="team-creation-section">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label-create'>Team Name:</label>
                        <input className="inputCreate" type="text" value={nameTeam} onChange={(e) => setNameTeam(e.target.value)} />
                    </div>
                    <div>
                        <label className='label-create'>Color Shirt:</label>
                        <input className="inputCreate" type="text" value={colorShirt} onChange={(e) => setColorShirt(e.target.value)} />
                    </div>
                    <div>
                        <label className='label-create'>Place:</label>
                        <input className="inputCreate" type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
                    </div>
                    <div>
                        <label className='label-create'>Add player by phone:</label>
                        <div style={{ display: 'flex' }}>
                            <input className="inputCreate2" type="text" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} />
                            <button type="button" className='button-add' onClick={handleAddPlayer}>Add Player</button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0px' }}>
                        <button className='button-create' type="submit">Create Team</button>
                    </div>
                </form>
            </div>
            {showPlayers && (
                <div>
                    <h2 style={{ fontFamily: "Angkor", margin: 50 }}>Player:</h2>
                    <div className="player-management-section">
                        {players.map((player, index) => (
                            <div key={index} className='box-player'>
                                <p>Name: <strong style={{ fontFamily: "Courier New" }}>{player.namePlayer}</strong></p>
                                <p>Email: <strong style={{ fontFamily: "Courier New" }}>{player.email}</strong></p>
                                <p>Phone: <strong style={{ fontFamily: "Courier New" }}>{player.phone}</strong></p>
                                <p>Age: <strong style={{ fontFamily: "Courier New" }}>{player.age}</strong></p>
                                <button className='button-remove' onClick={() => handleRemovePlayer(index)}>Remove Player</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}