const express = require('express');
const nunjucks = require('nunjucks');

const db = require('./database/config');
const server = express();

// Middlewares
server.use(express.static('../frontend/public/'));
server.use(express.urlencoded({ extended: true }));

// Template engine
nunjucks.configure('../frontend/', {
    express: server,
    noCache: true,
})


server.get('/', (req, res) => {
    db.query('SELECT * FROM donors', (err, result) => {
        if (err) return res.send('Erro no banco de dados');

        const donors = result.rows;
        return res.render('index.html', { donors });
    });
});

server.post('/', (req, res) => {
    const { name, email, blood } = req.body;

    if (!name || !email || !blood) {
        return res.status(401).json({ error: 'Por favor preencher todos os campos' });
    }

    const query = `INSERT INTO donors ("name", "email", "blood")
                   VALUES ($1, $2, $3)`
    const values = [name, email, blood];

    db.query(query, values, (err) => {
        if (err) return res.send(err + 'Erro no banco de dados.');

        return res.redirect('/');
    })

})

server.listen(3333);
