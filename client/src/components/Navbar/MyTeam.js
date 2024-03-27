import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyTeam = () => {
    const [teamData, setTeamData] = useState(null);
    const [updateData, setUpdateData] = useState({ nameTeam: '', colorShirt: '', place: '' });
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [emailOrPhone, setEmailOrPhone] = useState('');


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
                if (response.data && response.data.team) {
                    const team = response.data.team;
                    const playerDetails = await Promise.all(team.players.map(phone =>
                        axios.get(`http://localhost:3001/find/players/${phone}`, { headers: { Authorization: `Bearer ${token}` } })
                    ));
                    const updatedPlayers = playerDetails.map(response => response.data);
                    setTeamData({ ...team, players: updatedPlayers });
                } else {
                    setTeamData({});
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
        if (showUpdateForm) {
            setShowUpdateForm(false);
        } else {
            setUpdateData({
                nameTeam: teamData?.nameTeam || '',
                colorShirt: teamData?.colorShirt || '',
                place: teamData?.place || '',
            });
            setShowUpdateForm(true);
        }
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
            window.location.reload();
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

    const handleAddPlayer = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('Bạn phải đăng nhập để thực hiện thao tác này!');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3001/find/players?phone=${emailOrPhone}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            console.log(response.data._id);
            if (!response.data || !response.data._id) {
                alert('Không tìm thấy cầu thủ với số điện thoại này.');
                return;
            }
            const playerId = response.data._id;
            await axios.post(`http://localhost:3001/add-player-to-team/add-to-team`, {
                teamId: teamData._id,
                playerId: playerId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Cầu thủ đã được thêm vào đội!');
            setEmailOrPhone('');
        } catch (error) {
            alert('Có lỗi xảy ra. Hãy thử lại.');
        }
    };

    if (!teamData) {
        return <div>Bạn vẫn chưa có đội của riêng mình, hãy tạo ngay</div>;
    }

    return (
        <div className='container-myteam'>
            <h2 style={{ display: 'flex', justifyContent: 'center', fontFamily: "Angkor", fontSize: 50, margin: 50, }}>My Team</h2>
            <div className='box-myteam'>
                {teamData.nameTeam && <p>Name Team: <strong>{teamData.nameTeam}</strong></p>}
                {teamData.colorShirt && <p>Color Shirt: <strong>{teamData.colorShirt}</strong></p>}
                {teamData.place && <p>Place: <strong>{teamData.place}</strong></p>}
                <p>Players:</p>
                <ul className='ul-myteam'>
                    {teamData.players.map(player => (
                        <li key={player._id}>
                            <div className='inforPlayer'>
                                <p>{player.namePlayer}</p>
                                <button className="button-myteam" onClick={() => handleRemovePlayer(player._id)}>Xóa</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={handleOpenUpdateForm} className='update-button'>Cập Nhật Đội Bóng</button>
                </div>
                {showUpdateForm && (
                    <div className='box-change-myteam'>
                        <input name="nameTeam" value={updateData.nameTeam} onChange={handleChange} placeholder="Tên đội mới" />
                        <input name="colorShirt" value={updateData.colorShirt} onChange={handleChange} placeholder="Màu áo mới" />
                        <input name="place" value={updateData.place} onChange={handleChange} placeholder="Địa điểm mới" />
                        <input
                            type="text"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            placeholder="Nhập số điện thoại cầu thủ mới"
                        />
                        <button type="button" onClick={handleAddPlayer} className='add-myteam-button'>Add Player</button>
                        <button className='ok-myteam-button' onClick={handleUpdateTeam}>Đồng Ý</button>
                    </div>
                )}
                <div style={{ display: 'flex', position: 'relative', left: '80%' }}>
                    <button className='delelte-myteam-button' onClick={handleDeleteTeam}>Xóa Đội Bóng</button>
                </div>
            </div>
        </div>
    );
};

export default MyTeam;
