const express = require('express');
const app = express();
const cors = require('cors');
const mariadb = require('mariadb');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
app.use(cors());
app.use(bodyParser.json());

const pool = mariadb.createPool ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bts_e5',
});

pool.getConnection()
.then(conn => {
    console.log("Connexion à la base de données réussie")
    conn.end();
})
.catch(err => {
    console.log("Erreur lors de la connexion à la base de données: "+ err)
});

app.get('/instrument', async (req, res) => {
    try {
        console.log('Lancement de la requête');
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM instrument');
        conn.release();

        res.status(200).json(rows);
    } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        res.status(500).send("Erreur lors de la récupération des données: " + err.message);
    }
});

app.get('/instrument/:id', async (req, res) => {
    let conn;
    
    try {
       
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT Prix, Nom,Categorie  FROM instrument WHERE id_instrument = ?', [req.params.id]);
        
        res.status(200).json(rows);
    } catch (err) {
        console.log("oups")
        res.status(500).send("Erreur lors de la récupération des données: "+ err);
    }
});

app.post('/add/user', async (req, res) => {
    const { nom, prenom, email, password, admin } = req.body;

    try {
        const userExists = await pool.query('SELECT * FROM users WHERE mail = ?', [email]);
        if (userExists.length > 0) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query('INSERT INTO users (Nom, Prenom, mail, mdp, Admin) VALUES (?, ?, ?, ?, ?)', [nom, prenom, email, hashedPassword, admin]);


        const userId = newUser.insertId.toString();
        res.status(201).json({ message: "Utilisateur ajouté avec succès.", userId: userId });
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur:", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout de l'utilisateur." });
    }
});

app.post('/add/instrument', async (req, res) => {
  const { NomInstrument, CategorieInstrument, PrixInstrument} = req.body;

  try {


      const newInstru = await pool.query('INSERT INTO instrument (Nom, Categorie, Prix) VALUES (?, ?, ?)', [NomInstrument, CategorieInstrument, PrixInstrument]);

      const userId = newInstru.insertId.toString();
      res.status(201).json({ message: "Intrument ajouté avec succès.", userId: userId });
  } catch (error) {
      console.error("Erreur lors de l'ajout de l'Intrument:", error);
      res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout de l'Intrument." });
  }
});


app.put('/edit/instrument/:id', async (req, res) => {
    console.log(req.body)
    const { Nom, Categorie, Prix } = req.body.instrument;
   console.log(Nom)
    try {
        const updatedInstru = await pool.query('UPDATE instrument SET Nom = ?, Categorie = ?, Prix = ? WHERE id_instrument = ?', [Nom, Categorie, Prix, req.params.id]);
        res.status(200).json({ message: "Instrument modifié avec succès." });
    } catch (error) {
        console.error("Erreur lors de la modification de l'instrument:", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la modification de l'instrument." });
    }
}
);


app.delete('/delete/instrument/:id', async (req, res) => {
    try {
        const deletedInstru = await pool.query('DELETE FROM instrument WHERE id_instrument = ?', [req.params.id]);
        res.status(200).json({ message: "Instrument supprimé avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'instrument:", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'instrument." });
    }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
