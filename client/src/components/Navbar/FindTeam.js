import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FindTeam() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await axios.get('http://localhost:3001/find/teams');
            const teamsData = response.data;

            // Lặp qua mỗi đội bóng
            for (let i = 0; i < teamsData.length; i++) {
                const team = teamsData[i];

                for (let j = 0; j < team.players.length; j++) {
                    const playerId = team.players[j];
                    const playerResponse = await axios.get(`http://localhost:3001/find/player/${playerId}`);
                    const playerData = playerResponse.data;
                    team.players[j] = playerData;
                }
            }

            // Cập nhật trạng thái với thông tin chi tiết của các cầu thủ
            setTeams(teamsData);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    return (
        <div>
            <h1>All Teams</h1>
            <ul>
                {teams.map((team, index) => (
                    <li key={team._id}>
                        <h2>{team.nameTeam}</h2>
                        <p>Logo: <img src={team.logo} alt="Team Logo" /></p>
                        <p>Color Shirt: {team.colorShirt}</p>
                        <h3>Players:</h3>
                        <ul>
                            {team.players.map((player, playerIndex) => (
                                <li key={player._id}>
                                    Name: {player.name}, Email: {player.email}, Phone: {player.phone}, Age: {player.age}, Shirt Number: {player.shirtNumber}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
