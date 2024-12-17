// ----- Types -----
export type SandboxItem = {
    id: string;
    type: 'note' | 'image' | 'drawing';
    content: { text?: string; url?: string };
    x: number;
    y: number;
};