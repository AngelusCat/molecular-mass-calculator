export interface Cache {
    set(key: string, value: string|Buffer): Promise<void>;
    get(key: string): Promise<string|null>;
}