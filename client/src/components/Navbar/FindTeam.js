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
        <div className='container-findteam'>
            <h1 style={{display: 'flex',justifyContent:'center',fontFamily: "Angkor",fontSize:50,margin: 50}}>All Teams</h1>
            <div className='box-findteam'>
                <ul>
                    {teams.length === 0 ? (
                        <li>No Teams Found</li>
                    ) : (
                        teams.map((team, index) => (
                            <div className='content-findteam'>
                                <li key={team._id}>
                                    <h3>CLB: {team.nameTeam}</h3>
                                    <h2>Nơi sinh hoạt:{team.place}</h2>
                                    {team.colorShirt && <h6>Màu áo đội: {team.colorShirt}</h6>}
                                    <h6>Số thành viên: {team.memberCount}</h6>
                                    <button className='button-findteam'>Liên hệ</button>
                                </li>
                            </div>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
