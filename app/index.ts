import { Hono } from "hono";
import { contact } from "./user/contact";
import { prettyJSON } from "hono/pretty-json";
import { sequelize } from "./connection";

const app = new Hono();

app.use('/api/*', prettyJSON())
app.route('/api/contact', contact);

app.get('/', (c) => c.text('Welcome to Hono on BUN, dear friend'));

setTimeout(() => {
    sequelize.sync();
}, 1000);


export default app;