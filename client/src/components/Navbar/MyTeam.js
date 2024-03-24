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
            // Cập nhật lại danh sách thành viên sau khi xóa
            setTeamData(prevTeamData => ({
                ...prevTeamData,
                players: prevTeamData.players.filter(id => id !== playerId)
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
            <p>Color Shirt: {teamData.colorShirt}</p>
            <p>Players:</p>
            <ul>
                {teamData.players.map(playerId => (
                    <li key={playerId}>
                        {playerId}
                        <button onClick={() => handleRemovePlayer(playerId)}>Xóa</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleDeleteTeam}>Xóa Đội Bóng</button>
        </div>
    );
};

export default MyTeam;
