import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <main>
      <Container>
        <Box>
          <Card>
            <Typography variant="h2" color="textSecondary" align="center" gutterBottom>Login</Typography>
          </Card>
          <Button variant="contained" color="success">
              Success
            </Button>
        </Box>
      </Container>
    </main>
  );
}