import { Hono } from "hono";

export const user = new Hono();

user.get('/', (c) => {
    // return c.text('user list');
    return c.json(['user1', 'user2']);
});

user.get('/:id', (c) => {
    const userId = c.req.param('id');
    return c.text(`User with id: ${userId}`);
});

user.post('/', (c) => {
    return c.text('User Created');
})

user.put('/:id', (c) => {
    const userId = c.req.param('id');
    return c.text(`User with ${userId} updated`)
})