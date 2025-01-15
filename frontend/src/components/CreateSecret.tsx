import { useState } from 'react';
import { TextInput, Button, Select, Paper, Title, Text, Container, Stack, Alert } from '@mantine/core';
import { IconLock, IconCopy, IconCheck } from '@tabler/icons-react';
import { createSecret } from '../services/api';
import { TTL_OPTIONS, TTLOption } from '../types';

export function CreateSecret() {
    const [secret, setSecret] = useState('');
    const [ttl, setTtl] = useState<TTLOption>('week');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [secretLink, setSecretLink] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await createSecret(secret, ttl);
            setSecretLink(response.link);
            setSecret('');
        } catch (err) {
            setError('Failed to create secret. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        if (secretLink) {
            try {
                await navigator.clipboard.writeText(secretLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                setError('Failed to copy to clipboard');
            }
        }
    };

    return (
        <Container size="sm">
            <Paper radius="md" p="xl" withBorder>
                <Title order={2} mb="md">Create Secret</Title>
                <Text c="dimmed" size="sm" mb="xl">
                    Share secrets securely with a self-destructing link
                </Text>

                {error && (
                    <Alert color="red" mb="md">
                        {error}
                    </Alert>
                )}

                {secretLink ? (
                    <Stack>
                        <Text fw={500}>Secret Link Created!</Text>
                        <Text size="sm" c="dimmed">
                            Share this link with your recipient. It will self-destruct after being viewed.
                        </Text>
                        <Paper withBorder p="md" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Text style={{ flex: 1 }} className="break-word">
                                {secretLink}
                            </Text>
                            <Button
                                color={copied ? 'teal' : 'blue'}
                                onClick={handleCopy}
                                leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                            >
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                        </Paper>
                        <Button onClick={() => setSecretLink(null)} variant="subtle">
                            Create Another Secret
                        </Button>
                    </Stack>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Stack>
                            <TextInput
                                required
                                label="Secret"
                                placeholder="Enter your secret message"
                                leftSection={<IconLock size={16} />}
                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                                minLength={1}
                                autoFocus
                            />
                            <Select
                                label="Expiration Time"
                                value={ttl}
                                onChange={(value) => setTtl(value as TTLOption)}
                                data={Object.entries(TTL_OPTIONS).map(([value, label]) => ({
                                    value,
                                    label
                                }))}
                            />
                            <Button type="submit" loading={loading}>
                                Generate Secret Link
                            </Button>
                        </Stack>
                    </form>
                )}
            </Paper>
        </Container>
    );
} 