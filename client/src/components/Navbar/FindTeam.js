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

            setTeams(teamsData);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    return (
        <div className='container-findteams'>
            <h1>All Teams</h1>
            <div>
                <ul>
                    {teams.length === 0 ? (
                        <li>No Teams Found</li>
                    ) : (
                        teams.map((team, index) => (
                            <div>
                                <li key={team._id}>
                                    <h2>{team.nameTeam}</h2>
                                    {team.logo && <p>Logo: <img src={team.logo} alt="Team Logo" /></p>}
                                    {team.colorShirt && <p>Color Shirt: {team.colorShirt}</p>}
                                    <p>Member Count: {team.memberCount}</p>
                                    <button>Liên hệ</button>
                                </li>
                            </div>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
