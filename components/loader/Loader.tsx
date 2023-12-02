import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const Loader = () => {
  return (
    <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <CircularProgress />
    </Box>
  )
}