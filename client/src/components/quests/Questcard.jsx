import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';

export default function QuestCard({ quest, onApply }) {
    const xp = quest.xp * (quest.urgent ? quest.multiplier : 1);

    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: 3,
                borderColor: quest.urgent ? 'error.main' : 'divider',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
                        {quest.title}
                    </Typography>
                    {quest.urgent && <Chip size="small" color="error" label={`Срочно x${quest.multiplier}`} />}
                </Box>

                <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {quest.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip size="small" variant="outlined" label={`⏱ ${quest.durationHours} ч`} />
                    <Chip size="small" variant="outlined" label={`📍 ${quest.distanceKm} км`} />
                    <Chip size="small" variant="outlined" label={`👥 ${quest.responses}`} />
                    <Chip size="small" color="primary" label={`⭐ ${xp} XP`} />
                </Box>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button fullWidth variant="contained" disableElevation onClick={() => onApply?.(quest)}>
                    Откликнуться
                </Button>
            </CardActions>
        </Card>
    );
}