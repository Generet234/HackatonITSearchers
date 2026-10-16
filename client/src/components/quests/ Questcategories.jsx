import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QUEST_TYPE_LIST } from './questTypes.js';

// Экран выбора категории: 5 плиток, как на слайде
export default function QuestCategories() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ py: 3 }}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
                Категории квестов
            </Typography>

            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}>
                {QUEST_TYPE_LIST.map((t) => (
                    <Box
                        key={t.path}
                        component="button"
                        type="button"
                        onClick={() => navigate(`/volunteer/tasks/${t.path}`)}
                        sx={{
                            textAlign: 'center',
                            cursor: 'pointer',
                            color: '#fff',
                            font: 'inherit',
                            p: 3,
                            minHeight: 130,
                            borderRadius: 5,
                            border: '3px solid #4a5a8a',
                            background: 'linear-gradient(135deg, #0b0430 0%, #24096b 100%)',
                            transition: 'transform .15s, border-color .15s',
                            '&:hover': { transform: 'translateY(-2px)', borderColor: '#8a9bd6' },
                            '&:focus-visible': { outline: '3px solid #8a6bff', outlineOffset: 2 },
                        }}
                    >
                        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>{t.title}</Typography>
                        <Typography sx={{ mt: 1, fontWeight: 600, opacity: 0.85 }}>{t.description}</Typography>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}
