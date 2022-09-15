export interface INavbarConfig{
    linkUrl: string;
    displayName: string;
    role?: number;
    loggedIn?: boolean;
}

export const NavbarConfig: INavbarConfig[] = [
    {
        linkUrl: 'memories',
        displayName: 'Memories',
        loggedIn: true
    },
    {
        linkUrl: 'memories/create',
        displayName: 'Create Memory',
        role: 0
    }
];