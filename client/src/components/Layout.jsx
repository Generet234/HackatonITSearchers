import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
    return (
        <Box sx={{ minHeight: '100vh', pb: { xs: 'calc(56px + env(safe-area-inset-bottom))', md: 0 } }}>
            <Navbar />
            <Outlet />
        </Box>
    );
}