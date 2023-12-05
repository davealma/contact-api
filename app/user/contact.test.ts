import {expect, test} from 'bun:test';

test('/api/contact returns a list', async () => {
    const response = await fetch(`${process.env.API_URL}/contact`);
    const body = await response.json();

    expect(body["data"]).toBeArray();
});

test('/api/contact/randomId return 404', async() => {
    const response = await fetch(`${process.env.API_URL}/contact/999999`);
    
    expect(response.status).toBe(404);
});
