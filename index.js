//installato express lo importo
const express = require("express");
//creo una istanza di express
const app = express();

// C R U D
//se nel body della risposta vogliamo avere chiave valore 
//come se fossero i parametri via url ma nel body della richiesta
//se mettiamo true anche i null e le stringhe vuote verranno mappati
app.use(express.urlencoded({
    extended: true
}));
//se vogliamo gestire dei dati in formato json nel body della richiesta http
//come una riciesta pura senza alcuna codifica
app.use(express.json());

//importiamo il router
//app.use('/todos/:id',logger);
const todosRoutes = require("./routes/todos");
const listsRoutes = require('./routes/lists');
//per utilizzare il router , indichiamo quale rotta usare
//per utilizzare le rotte definite nel file delle rotte 
//quindi /todos è la rotta di partenza e il router è todosRoutes 
//ad esempiodove ci sono tutte le rotte a partire da /todos
app.use("/todos", todosRoutes);
app.use('/lists', listsRoutes);

app.listen(4000, () => console.log("listening on port 4000"));
