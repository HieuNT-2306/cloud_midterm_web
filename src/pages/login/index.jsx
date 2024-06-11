import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../state/userSlice';
import { useLoginUserMutation } from '../../state/api';
import { Box, Grid, Typography } from '@mui/material';
import { FormCustom } from '../../components/Useform';
import CustomInput from '../../components/controls/CustomInput';
import CustomButton from '../../components/controls/CustomButton';
import Notification from '../../components/Notification';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginUser, { isLoading }] = useLoginUserMutation();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ username, password }).unwrap();
            const { token, user } = response;
            document.cookie = `token=${token};path=/;`;
            dispatch(setUser(user));
            navigate('/');
        } catch (error) {
            const status = error.status;
            if (status === 401) {
                setNotify({
                    isOpen: true,
                    message: 'Tài khoản hoặc mật khẩu của bạn chưa đúng!',
                    type: 'error'
                })
            }
            if (status === 409) {
                setNotify({
                    isOpen: true,
                    message: 'Bạn đã vượt quá giới hạn 10 yêu cầu/phút, xin vui lòng thử lại sau',
                    type: 'error'
                })
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#D3D3D3',
            }}
        >
            <FormCustom
                onSubmit={handleLogin}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        padding: 2,
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        backgroundColor: '#fff',
                    }}
                >
                    <Typography>
                        Đăng nhập vào ứng dụng quản lý sinh viên VDT Cloud 2024:
                    </Typography>
                    <CustomInput
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Tên người dùng"
                    />
                    <CustomInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mật khẩu"
                    />
                    <CustomButton
                        type="submit"
                        text="Đăng nhập"
                        disabled={isLoading}
                    />
                </Box>
            </FormCustom>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </Box>
    );
}

export default Login;
