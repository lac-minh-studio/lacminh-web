export interface ActivityData {
    id: string;
    user: string;
    action: string;
    target: string;
    time: string;
    status: 'Success' | 'Pending' | 'Failed';
}