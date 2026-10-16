import {
    AppBar, BottomNavigation, BottomNavigationAction, Box, Button,
    IconButton, Paper, Toolbar, Typography,
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MENU = {
    volunteer: [
        { label: 'Задания', path: '/volunteer/tasks', icon: <ListAltIcon /> },
        { label: 'Мои', path: '/volunteer/my-tasks', icon: <AssignmentTurnedInIcon /> },
        { label: 'Награды', path: '/volunteer/rewards', icon: <CardGiftcardIcon /> },
        { label: 'Профиль', path: '/profile', icon: <PersonIcon /> },
    ],
    organizer: [
        { label: 'Мои задания', path: '/organizer/tasks', icon: <ListAltIcon /> },
        { label: 'Создать', path: '/organizer/create', icon: <AddCircleIcon /> },
        { label: 'Профиль', path: '/profile', icon: <PersonIcon /> },
    ],
};

export default function Navbar() {
    const { user, logout } = useAuth();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    if (!user) return null;

    const items = MENU[user.role] || [];
    // подсвечиваем пункт, если текущий путь начинается с его пути
    const current = items.find((i) => pathname.startsWith(i.path))?.path ?? false;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* Верхняя панель: логотип, баллы, выход (на десктопе ещё и меню) */}
            <AppBar position="sticky" color="primary" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Волонтёры
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, mr: 2 }}>
                        {items.map((i) => (
                            <Button
                                key={i.path}
                                color="inherit"
                                startIcon={i.icon}
                                onClick={() => navigate(i.path)}
                                sx={{ fontWeight: current === i.path ? 700 : 400 }}
                            >
                                {i.label}
                            </Button>
                        ))}
                    </Box>

                    {user.role === 'volunteer' && (
                        <Typography sx={{ mr: 1, fontWeight: 600 }}>⭐ {user.points ?? 0}</Typography>
                    )}
                    <IconButton color="inherit" onClick={handleLogout} aria-label="Выйти">
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Нижнее меню: только на мобильных */}
            <Paper
                elevation={8}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    position: 'fixed',
                    bottom: 0, left: 0, right: 0,
                    zIndex: (t) => t.zIndex.appBar,
                    pb: 'env(safe-area-inset-bottom)', // чтобы не перекрывала полоску iPhone
                }}
            >
                <BottomNavigation
                    showLabels
                    value={current}
                    onChange={(_, path) => navigate(path)}
                >
                    {items.map((i) => (
                        <BottomNavigationAction
                            key={i.path}
                            label={i.label}
                            value={i.path}
                            icon={i.icon}
                        />
                    ))}
                </BottomNavigation>
            </Paper>
        </>
    );
}