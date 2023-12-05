import { Hono } from "hono";
import { Contact } from "../models";
import { Model } from "sequelize";
type Variables = {
    contact: Model<any, any>
};
export const contact = new Hono<{Variables: Variables}>();

contact.use('/:id', async (c, next) => {
    const contactId = c.req.param('id');
    try {
        const contact = await Contact.findByPk(contactId)
        if (contact === null) {
            c.status(404);
            return c.text('Contact not Found');
        }else {
            c.set('contact', contact);
            await next();
        }

    } catch (error) {
        c.status(400);
        c.json({errorMessage: error});
    }
})

contact.get('/', async (c) => {
    try {
        const users = await Contact.findAll();
        const usersData = users.map(user => user.toJSON());
        return c.json({data: usersData})
    }catch(error) {
        c.status(400);
        return c.json({errorMessage: error});
    }
    
});

contact.get('/:id', async (c) => {
    const contact = c.get('contact');
    return c.json({data: contact.toJSON()})
});

contact.post('/', async (c) => {
    const body = await c.req.parseBody();
    console.log(body)
    try {
        const save = await Contact.create(body);
        c.status(201)
        return c.json({user: save.toJSON()});
    }catch(error) {
        c.status(400)
        return c.json({errorMessage: error})
    }
});

contact.put('/:id', async (c) => {
    const body = await c.req.parseBody();
    const contact = c.get('contact');
    try {

        contact.set({...contact, ...body});
        await contact.save();
        c.status(204);
        return c.text('')
    } catch (error) {
        c.status(400);
        return c.json({errorMessage: error});
    }
})

contact.delete('/:id', async (c) => {
    const contact = c.get('contact');
    try {
        await contact.destroy();
        c.status(204);
        return c.text('');    
    } catch (error) {
        c.status(400);
        return c.json({errorMessage: error})
    }
    
});