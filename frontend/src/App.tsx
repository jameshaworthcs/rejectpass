import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, AppShell, Title, Container } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { useState } from 'react';
import { CreateSecret } from './components/CreateSecret';
import { ViewSecret } from './components/ViewSecret';

const theme = {
  primaryColor: 'blue',
  fontFamily: 'Inter, sans-serif',
  components: {
    Button: {
      defaultProps: {
        size: 'md',
      },
    },
  },
};

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(preferredColorScheme);

  return (
    <MantineProvider defaultColorScheme={colorScheme}>
      <Router>
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
          <AppShell.Header>
            <Container size="lg" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Title order={1} size="h3">Reject Secret Sharer</Title>
            </Container>
          </AppShell.Header>

          <AppShell.Main>
            <Routes>
              <Route path="/" element={<CreateSecret />} />
              <Route path="/:token" element={<ViewSecret />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </Router>
    </MantineProvider>
  );
}

export default App;
