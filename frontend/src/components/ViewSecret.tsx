import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Title, Button, Alert, Stack, Loader, Center, Textarea, Anchor } from '@mantine/core';
import { IconEye, IconAlertCircle, IconCopy, IconCheck, IconPlus } from '@tabler/icons-react';
import { getSecret } from '../services/api';

export function ViewSecret() {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [secret, setSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [revealed, setRevealed] = useState(false);

    const handleReveal = async () => {
        if (!token) return;

        try {
            setLoading(true);
            const secretData = await getSecret(token);
            setSecret(secretData);
            setRevealed(true);
        } catch (err) {
            console.error('Error fetching secret:', err);
            setError('This secret has expired or does not exist.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        if (secret) {
            try {
                await navigator.clipboard.writeText(secret);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                setError('Failed to copy to clipboard');
            }
        }
    };

    if (loading) {
        return (
            <Center h="60vh">
                <Loader size="xl" />
            </Center>
        );
    }

    return (
        <Container size="sm">
            <Paper radius="md" p="xl" withBorder>
                <Anchor onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <Title order={2} mb="md">View Secret</Title>
                </Anchor>

                {error ? (
                    <Stack>
                        <Alert icon={<IconAlertCircle size={16} />} color="red">
                            {error}
                        </Alert>
                        <Button variant="subtle" onClick={() => navigate('/')}>
                            Create New Secret
                        </Button>
                    </Stack>
                ) : !revealed ? (
                    <Stack>
                        <Alert color="blue">
                            This secret can only be viewed once and will be permanently deleted afterward.
                            Make sure you're ready to save it.
                        </Alert>
                        <Button
                            onClick={handleReveal}
                            leftSection={<IconEye size={16} />}
                            loading={loading}
                            color="blue"
                        >
                            Reveal Secret
                        </Button>
                    </Stack>
                ) : (
                    <Stack>
                        <Alert color="yellow">
                            This secret has been permanently deleted and cannot be viewed again.
                            Make sure to save it if needed.
                        </Alert>
                        <Paper withBorder p="md">
                            <Textarea
                                value={secret || ''}
                                readOnly
                                minRows={3}
                                autosize
                                styles={{ input: { cursor: 'text' } }}
                            />
                            <Stack gap="sm" mt="md">
                                <Button
                                    onClick={handleCopy}
                                    color={copied ? 'teal' : 'blue'}
                                    leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                >
                                    {copied ? 'Copied' : 'Copy Secret'}
                                </Button>
                                <Button
                                    variant="light"
                                    onClick={() => navigate('/')}
                                    leftSection={<IconPlus size={16} />}
                                >
                                    Create New Secret
                                </Button>
                            </Stack>
                        </Paper>
                    </Stack>
                )}
            </Paper>
        </Container>
    );
} 