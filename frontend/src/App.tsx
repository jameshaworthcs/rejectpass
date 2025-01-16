import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, AppShell, Title, Container, Text, Anchor } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { CreateSecret } from './components/CreateSecret';
import { ViewSecret } from './components/ViewSecret';

function App() {
  const preferredColorScheme = useColorScheme();

  return (
    <MantineProvider defaultColorScheme={preferredColorScheme}>
      <Router>
        <AppShell
          header={{ height: 60 }}
          footer={{ height: 40 }}
          padding="md"
        >
          <AppShell.Header>
            <Container size="lg" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Link to="/" className="header-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Title order={1} size="h3">Reject Secret Sharer</Title>
              </Link>
            </Container>
          </AppShell.Header>

          <AppShell.Main>
            <Routes>
              <Route path="/" element={<CreateSecret />} />
              <Route path="/:token" element={<ViewSecret />} />
            </Routes>
          </AppShell.Main>

          <AppShell.Footer>
            <Container size="lg" style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              <Text c="dimmed" size="sm">
                MIT License | <Anchor href="https://github.com/jameshaworthcs/rejectpass" target="_blank" rel="noopener noreferrer">GitHub</Anchor>
              </Text>
            </Container>
          </AppShell.Footer>
        </AppShell>
      </Router>
    </MantineProvider>
  );
}

export default App;
