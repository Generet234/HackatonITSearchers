import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function OrganisationRegister() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [serverError, setServerError] = useState('');

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
        defaultValues: { organization: '', phone: '', description: '', email: '', password: '', confirm: '' },
    });

    // MUI TextField требует inputRef вместо ref
    const reg = (name, opts) => {
        const { ref, ...rest } = register(name, opts);
        return { ...rest, inputRef: ref };
    };

    const onSubmit = async (data) => {
        try {
            setServerError('');
            const { confirm, ...payload } = data;
            const user = await registerUser({ ...payload, role: 'organizer' });
            setUser(user);
            navigate('/organizer/tasks');
        } catch (e) {
            setServerError(e.message || 'Не удалось зарегистрироваться');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f4f6f8', p: 2 }}>
            <Paper elevation={4} sx={{ p: { xs: 3, sm: 4 }, width: '100%', maxWidth: 450, borderRadius: 4 }}>
                <Typography variant="h5" component="h1" fontWeight={700} align="center" sx={{ mb: 1 }}>
                    Регистрация организатора
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                    Заполните данные для создания аккаунта
                </Typography>

                {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate
                     sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

                    <TextField label="Название организации / ваше имя"
                               {...reg('organization', { required: 'Введите название' })}
                               error={!!errors.organization} helperText={errors.organization?.message} />

                    <TextField label="Телефон"
                               {...reg('phone', { required: 'Введите телефон' })}
                               error={!!errors.phone} helperText={errors.phone?.message} />

                    <TextField label="Чем занимаетесь" multiline rows={3} {...reg('description')} />

                    <TextField label="Email" type="email" {...reg('email', {
                        required: 'Введите email',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Некорректный email' },
                    })} error={!!errors.email} helperText={errors.email?.message} />

                    <TextField label="Пароль" type="password" {...reg('password', {
                        required: 'Введите пароль',
                        minLength: { value: 6, message: 'Минимум 6 символов' },
                    })} error={!!errors.password} helperText={errors.password?.message} />

                    <TextField label="Повторите пароль" type="password" {...reg('confirm', {
                        validate: (v) => v === watch('password') || 'Пароли не совпадают',
                    })} error={!!errors.confirm} helperText={errors.confirm?.message} />

                    <Button type="submit" variant="contained" size="large" disabled={isSubmitting}
                            sx={{ py: 1.5, borderRadius: 3, fontWeight: 600, textTransform: 'none' }}>
                        {isSubmitting ? 'Загрузка...' : 'Зарегистрироваться'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}