import Box from "@mui/material/Box";

const MainLayout = ({ children }) => {
    return (
        <>
            <Box component='main' sx={{width: '100%', mx:"auto", boxSizing: 'border-box'}}>
                {children}
            </Box>
        </>
    )
}
export default MainLayout;