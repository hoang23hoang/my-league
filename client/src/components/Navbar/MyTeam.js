import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyTeam = () => {
    const [teamData, setTeamData] = useState(null);
    const [updateData, setUpdateData] = useState({ nameTeam: '', colorShirt: '', place: '' });
    const [showUpdateForm, setShowUpdateForm] = useState(false); 

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    alert('Bạn phải đăng nhập để xem thông tin này!');
                    window.location.href = 'http://localhost:3000/auth/login';
                    return;
                }
                const response = await axios.get('http://localhost:3001/player/my-team', { headers: { Authorization: `Bearer ${token}` } });
                if(response.data && response.data.team) {
                    const team = response.data.team;
                    const playerDetails = await Promise.all(team.players.map(playerId =>
                        axios.get(`http://localhost:3001/find/players/${playerId}`, { headers: { Authorization: `Bearer ${token}` } })
                    ));
                    const updatedPlayers = playerDetails.map(response => response.data);
                    setTeamData({ ...team, players: updatedPlayers });
                } else {
                    setTeamData({}); // Set an empty object if there's no team data
                }
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };
        fetchTeamData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleOpenUpdateForm = () => {
        setUpdateData({
            nameTeam: teamData.nameTeam || '',
            colorShirt: teamData.colorShirt || '',
            place: teamData.place || '',
        });
        setShowUpdateForm(true);
    };

    const handleUpdateTeam = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                alert('Bạn phải đăng nhập để thực hiện thao tác này!');
                return;
            }
            const response = await axios.put(`http://localhost:3001/teams/updateTeam/${teamData._id}`, updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setTeamData(response.data);
            alert('Cập nhật đội bóng thành công!');
            setShowUpdateForm(false);
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };

    const handleRemovePlayer = async (playerId) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                alert('Bạn phải đăng nhập để thực hiện thao tác này !');
                return;
            }
            await axios.post('http://localhost:3001/add-player-to-team/remove-from-team', {
                playerId: playerId,
                teamId: teamData._id
            }, {
                headers: { authorization: `Bearer ${token}` }
            });
            setTeamData(prevTeamData => ({
                ...prevTeamData,
                players: prevTeamData.players.filter(player => player._id !== playerId)
            }));
        } catch (error) {
            console.error('Error removing player:', error);
        }
    };

    const handleDeleteTeam = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                alert('Bạn phải đăng nhập để thực hiện thao tác này !');
                return;
            }
            await axios.delete(`http://localhost:3001/teams/delete-team/${teamData._id}`, {
                headers: { authorization: `Bearer ${token}` }
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    if (!teamData) {
        return <div>Bạn vẫn chưa có đội của riêng mình, hãy tạo ngay</div>;
    }

    return (
        <div>
            <h2>My Team</h2>
            {teamData.nameTeam && <p>Name Team: {teamData.nameTeam}</p>}
            {teamData.colorShirt && <p>Color Shirt: {teamData.colorShirt}</p>}
            {teamData.place && <p>Place: {teamData.place}</p>}
            <p>Players:</p>
            <ul>
                {teamData.players.map(player => (
                    <li key={player._id}>
                        <div>
                            <p>{player.namePlayer}</p>
                            <button onClick={() => handleRemovePlayer(player._id)}>Xóa</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={handleOpenUpdateForm}>Cập Nhật Đội Bóng</button>
            {showUpdateForm && (
                <div>
                    <input name="nameTeam" value={updateData.nameTeam} onChange={handleChange} placeholder="Tên đội mới" />
                    <input name="colorShirt" value={updateData.colorShirt} onChange={handleChange} placeholder="Màu áo mới" />
                    <input name="place" value={updateData.place} onChange={handleChange} placeholder="Địa điểm mới" />
                    <button onClick={handleUpdateTeam}>Đồng Ý</button>
                </div>
            )}
            <button onClick={handleDeleteTeam}>Xóa Đội Bóng</button>
        </div>
    );
};

export default MyTeam;
