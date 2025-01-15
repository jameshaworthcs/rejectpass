export interface Secret {
    password: string;
    ttl: number;
}

export interface SecretResponse {
    link: string;
    ttl: number;
}

export interface ApiError {
    type: string;
    title: string;
    'invalid-params': Array<{
        name: string;
        reason: string;
    }>;
}

export type TTLOption = 'hour' | 'day' | 'week' | 'two weeks';

export const TTL_OPTIONS: Record<TTLOption, string> = {
    'hour': '1 Hour',
    'day': '1 Day',
    'week': '1 Week',
    'two weeks': '2 Weeks'
}; 