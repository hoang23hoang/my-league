import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyTeam = () => {
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('http://localhost:3001/player/my-team', { headers: { authorization: `Bearer ${token}` } });
                console.log(response);
                setTeamData(response.data.team);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching team data:', error);
                setLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

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
