const express = require('express');
const app = express();

const flash = require('connect-flash');
const {redirectLogin, redirectHome,setSession,overrideMethods} = require('./middlewares/index');

// configure session



// C R U D
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(setSession());
app.use(overrideMethods());
app.use(flash());

// static files
app.use(express.static(__dirname + '/public'));
app.use('/axios',express.static(__dirname + '/node_modules/axios/dist'));
//app.use('/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/sweetalert2',express.static(__dirname + '/node_modules/sweetalert2/dist'));

const ehb = require('express-handlebars');

app.engine('.hbs', ehb({extname:'.hbs'}));
app.set('view engine','.hbs');


// routes management
const todosRoutes  = require('./routes/api/todos');
const listsRoutes  = require('./routes/api/lists');
const autRoutes = require('./routes/auth');

app.use('/auth',redirectHome, autRoutes);

app.use('/api/todos', redirectLogin,todosRoutes);
app.use('/api/lists',redirectLogin,listsRoutes );
app.use(['/lists','/'], redirectLogin, require('./routes/lists'));

//escludo la rotta di logout dai middlewares e la metto come rotta principale 
//altrimenti verificato che l'utente esiste mi redirezionerebbe direttamente alla home page
//senza eseguire il codice di  eliminare la sessione 
app.get('/logout', async (req, res)=>{
      req.session.destroy(()=>{
         res.redirect("/auth/login");
      })

});

app.listen(4000, ()=> console.log('listening on port 4000'));