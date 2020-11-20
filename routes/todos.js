//in questo file creo le mie rotte

//importo express
  const express = require('express');
  //importo in una costante il Router
  const router = express.Router();
  const {
      updateTodo,
      addTodo,
      deleteTodo,
      getTodoById,
      getTodos
  } = require('../controllers/todosController');

  //creo un middleware logger che legge i parametri 
  //in caso di parametri > 100 solleva un errore
  const logger = (req, res, next) => {
      if (req.params.id > 100) {
          next(new Error('id cannot be > 100'));
      }
      next();
  }
  //con il metodo all, qualunque rotta metto verrà 
  //chiamato questo middleware
  router.all('*', (req, resp, next) => {
      console.log('I am the all * middleware');
      /**devo mettere next per chiamare il prossimo middleware altrimenti si pianta tutto */
      next();
  });
  //per definire una rotta mettiamo router.metodo ('indirizzo')(richesta,risposta)=>{
  //     invio la risposta
  // }
 router.get('/', async (req, res)=>{
    try{
        const result = await getTodos();
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
  //potrei passare anche più middleware o un array di middleware o una combinazione di questi
  router.get('/:id([0-9]+)',  [logger, async (req, res)=>{

    try {
        const result = await getTodoById(req.params.id);
         res.status(result ? 200 : 404).json(result ? result : null);
         /**potrei passare anche qui un middleware da eseguire dopo */
    }catch (e) {
        res.status(500).send(e.toString());
    }
}]);


router.delete('/:id([0-9]+)', async (req, res)=>{
    const deleted = await deleteTodo(req.params.id);
    res.status(deleted? 200: 404).json(deleted? deleted: null);
});

   /**i parametri passati nell'url come 
       * ?parametro = valore li catturo con req.query
       * i parametri inviati come segmenti todos/parametro(es: id)
       * con req.params
       * i parametri inviati via post con req.body
       * */

 router.post('/', async (req, res)=>{
    try{
        const result = await addTodo(req.body);
        res.json(result);
    }catch (e) {
        res.status(500).send(e.toString());
    }

});
  //il metodo patch è per la modifica
  router.patch('/:id([0-9]+)', async (req, res)=>{
    try {
        const result = await updateTodo(req.params.id, req.body);
        res.status(result ? 200 : 404).json(result ? result : null);
    }catch (e) {
        res.status(500).send(e.toString());
    }

});
  module.exports = router;