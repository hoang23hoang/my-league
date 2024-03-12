import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyTeam = () => {
    const [teamData, setTeamData] = useState(null);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    alert('Bạn phải đăng nhập để xem thông tin này !');
                    window.location.href = 'http://localhost:3000/auth/login';
                }
                const response = await axios.get('http://localhost:3001/player/my-team',
                    { headers: { authorization: `Bearer ${token}` } });
                setTeamData(response.data.team);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchTeamData();
    }, []);

    if (!teamData) {
        return <div>Team not found</div>;
    }

    return (
        <div>
            <h2>My Team</h2>
            <p>Name: {teamData.nameTeam}</p>
            <p>Logo: {teamData.logo}</p>
            <p>Color Shirt: {teamData.colorShirt}</p>
            <p>Players:</p>
            <ul>
                {teamData.players.map(playerId => (
                    <li key={playerId}>{playerId}</li>
                ))}
            </ul>
            <p>Created At: {teamData.createdAt}</p>
            <p>Updated At: {teamData.updatedAt}</p>
        </div>
    );
};

export default MyTeam;
