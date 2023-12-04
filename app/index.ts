import { Hono } from "hono";
import { user } from "./user/user";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();
app.use('/api/*', prettyJSON())
app.route('/api/user', user);

app.get('/', (c) => c.text('Welcome to Hono on BUN, dear friend'))

app.get('/:name', (c) => {
    const name = c.req.param('name');
    return c.text(`Get ${name}`);
});


export default app;