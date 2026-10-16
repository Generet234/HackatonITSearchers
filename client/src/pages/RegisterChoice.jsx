import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import VolunteerForm from './VolunteerRegister.jsx'
import OrganisationForm from './OrganisationRegister.jsx'

const buttons = [
    <Button key="volunteer">Volunteer</Button>,
    <Button key="organisation">Organisation</Button>,
];

export default function RegisterChoiceForms() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <ButtonGroup size="large" aria-label="Large button group">
                <Box onClick={VolunteerForm}>{buttons[0]}</Box>
                <Box onClick={OrganisationForm}>{buttons[1]}</Box>
            </ButtonGroup>
        </Box>
    );
}