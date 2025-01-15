import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Title, Button, Alert, Stack, Loader, Center, Textarea } from '@mantine/core';
import { IconEye, IconAlertCircle, IconCopy, IconCheck, IconPlus } from '@tabler/icons-react';
import { getSecret, checkSecretExists } from '../services/api';

export function ViewSecret() {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [secret, setSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const [exists, setExists] = useState<boolean | null>(null);

    useEffect(() => {
        const checkExists = async () => {
            if (!token) return;
            try {
                const exists = await checkSecretExists(token);
                setExists(exists);
            } catch (err) {
                console.error('Error checking secret:', err);
                setError('Unable to verify secret status.');
            } finally {
                setLoading(false);
            }
        };
        checkExists();
    }, [token]);

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
                <Title order={2} mb="md">View Secret</Title>

                {error ? (
                    <Stack>
                        <Alert icon={<IconAlertCircle size={16} />} color="red">
                            {error}
                        </Alert>
                        <Button variant="subtle" onClick={() => navigate('/')}>
                            Create New Secret
                        </Button>
                    </Stack>
                ) : exists === false ? (
                    <Stack>
                        <Alert icon={<IconAlertCircle size={16} />} color="red">
                            This secret does not exist or has already been viewed.
                        </Alert>
                        <Button variant="subtle" onClick={() => navigate('/')}>
                            Create New Secret
                        </Button>
                    </Stack>
                ) : exists && !revealed ? (
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
                ) : revealed ? (
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
                ) : null}
            </Paper>
        </Container>
    );
} 