//installato express lo importo
const express = require("express");
//creo una istanza di express
const app = express();
const methodOverride = require('method-override');
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
//importo bootstrap da node modules
//app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
const ehb = require('express-handlebars');

/**Devo dire a express-js di usare un engine per processare le nostre pagine 
 * handlebars
 */
//specifico l'estensione che avranno i file e l'engine da usare
app.engine('.hbs',ehb({extname:'.hbs'}));
//una volta inizializzato l'engine dobbiamo dire a express cosa impostare
app.set('view engine','.hbs');//devo creare una cartella views


//importiamo il router
//app.use('/todos/:id',logger);
const todosRoutes = require("./routes/api/todos");
const listsRoutes = require('./routes/api/lists');
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))
//per utilizzare il router , indichiamo quale rotta usare
//per utilizzare le rotte definite nel file delle rotte 
//quindi /todos è la rotta di partenza e il router è todosRoutes 
//ad esempiodove ci sono tutte le rotte a partire da /todos
app.use("/api/todos", todosRoutes);
app.use('/api/lists', listsRoutes);

app.use(['/lists','/'], require('./routes/lists'));
//uso un array di liste cosi sia con / che con /lists vedo tutte le liste
// app.get('/',(req,res) =>{
//     res.render('index');
// });
app.listen(4000, () => console.log("listening on port 4000"));
