import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuestCard from './QuestCard.jsx';
import { QUEST_TYPES } from './questTypes.js';
import { MOCK_QUESTS } from './mockQuests.js';

// Общий список квестов одного типа. Все 5 компонентов категорий используют его.
export default function QuestList({ type }) {
    const navigate = useNavigate();
    const meta = QUEST_TYPES[type];
    const quests = MOCK_QUESTS.filter(meta.filter);

    const handleApply = (quest) => {
        console.log('Отклик на квест', quest.id); // TODO: запрос к API
    };

    return (
        <Container maxWidth="md" sx={{ py: 3 }}>
            <Button onClick={() => navigate('/volunteer/tasks')} sx={{ mb: 1, textTransform: 'none' }}>
                ← Все категории
            </Button>

            <Typography component="h1" variant="h4" sx={{ fontWeight: 800 }}>
                {meta.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                {meta.description}
            </Typography>

            {quests.length === 0 ? (
                <Typography color="text.secondary">
                    Пока нет квестов в этой категории. Загляните позже или выберите другую.
                </Typography>
            ) : (
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}>
                    {quests.map((q) => (
                        <QuestCard key={q.id} quest={q} onApply={handleApply} />
                    ))}
                </Box>
            )}
        </Container>
    );
}