const express = require('express');
const router = express.Router();
//salvo in una variabile tutti i metodi del controller e ci accedo con la dot notation
const list = require('../controllers/listsController');
const {getTodosByListId} = require('../controllers/todosController');
const  getValues = models => models.map(rec => rec.toJSON());
router.get('/', async (req, res)=>{
    try{
        console.log('session' + req.session.userId);
        const {q}  =  req.query;
        const result = getValues(await list.getLists({q}));
        res.render('index', 
        {lists : result, 
            q,
            user : req.session.user,
            errors: req.flash('errors'),
            messages: req.flash('messages')
        });
        
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.get('/:list_id([0-9]+)/todos', async (req, res)=>{
    try{
        const listId = req.params.list_id;
        const listObj = await list.getListById(listId);
        //console.log(list)
        const result = getValues(await getTodosByListId(listId));
        //console.log(result);
        res.render('todos', {
            todos : result, 
            list_name: listObj.name,
            user : req.session.user});
    } catch (e) {
        res.status(500).send(e.toString());
    }

});

router.delete('/:list_id([0-9]+)', async (req,resp) =>{
    try{
     const deleted = await list.deleteList(req.params.list_id);
     resp.redirect('/');
    //resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        resp.status(500).send(e.toString());
    }
});
router.get('/:list_id([0-9]+)/edit', async (req, res)=>{
    try{
        const listId = req.params.list_id;
        const listObj = await list.getListById(listId);
        const values = listObj.dataValues;
        //console.log(values);
        res.render('list/edit', 
        {...values,
            user : req.session.user
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }

});

router.patch('/:list_id([0-9]+)', async (req,resp) =>{
    try{
        const updated = await list.updateList(req.params.list_id, req.body.list_name);
        req.flash('messages','List modified correctly!')
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        req.flash('errors', e.errors.map(ele => ele.message));
        resp.redirect(req.params.list_id + '/edit');
    }
});
router.get('/new', async (req, res)=>{
    try{
        
        res.render('list/newlist',{
            user : req.session.user
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.post('/', async (req,resp) =>{
    try{
        const updated = await list.addList( req.body.list_name);
        req.flash('messages','List added!')
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
       // console.log(e.errors.map(ele => ele.message));
        req.flash('errors', e.errors.map(ele => ele.message));
        // resp.status(500).send(e.toString());
        resp.redirect('/');
    }
});
module.exports = router;