const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'ROLE', uid: 'role' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
];
const users = [
    {
        id: 1,
        email: 'john.doe@example.com',
        password: 'securePassword',
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        role: 'USER',
    },
    {
        id: 2,
        email: 'Zoey.doe@example.com',
        password: 'securePassword',
        firstName: 'Zoey',
        lastName: 'Lang',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        role: 'ADMIN',
    },
    {
        id: 3,
        email: 'Jane.doe@example.com',
        password: 'securePassword',
        firstName: 'Jane',
        lastName: 'Fisher',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        role: 'ADMIN',
    },
    {
        id: 4,
        email: 'William.doe@example.com',
        password: 'securePassword',
        firstName: 'William',
        lastName: 'Howard',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        role: 'USER',
    },
    {
        id: 5,
        email: 'Kristen.doe@example.com',
        password: 'securePassword',
        firstName: 'Kristen',
        lastName: 'Copper',
        avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
        role: 'USER',
    },
];

export { columns, users };
