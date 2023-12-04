import {expect, test} from 'bun:test';

test('/api/user returns a list', async () => {
    const response = await fetch('http://localhost:3000/api/user');
    const body = await response.json();

    expect(body).toBeArray();
});

test('/api/user/randomId return 404', async() => {
    const response = await fetch(`http://localhost:3000/api/user/${Date.now()}`);
    
    expect(response.status).toBe(404);
});
