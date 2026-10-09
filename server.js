const express = require("express");
const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");

const app = express();
const porta = 3000;

const banco = new Database("professores.db");

app.use(express.json());
app.use(express.static(__dirname));

banco.prepare(`
    CREATE TABLE IF NOT EXISTS professores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
    )
`).run();

const email = "Professor@gmail.com";
const senha = "1234";

const professor = banco.prepare(`
    SELECT * FROM professores WHERE email = ?
`).get(email);

if (!professor) {
    const senhaProtegida = bcrypt.hashSync(senha, 10);

    banco.prepare(`
        INSERT INTO professores (email, senha)
        VALUES (?, ?)
    `).run(email, senhaProtegida);

    console.log("Professor cadastrado!");
}

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const professor = banco.prepare(`
        SELECT * FROM professores
        WHERE email = ?
    `).get(email);

    if (!professor) {
        return res.json({
            sucesso: false,
            mensagem: "E-mail ou senha incorretos."
        });
    }

    const senhaCorreta = bcrypt.compareSync(
        senha,
        professor.senha
    );

    if (!senhaCorreta) {
        return res.json({
            sucesso: false,
            mensagem: "E-mail ou senha incorretos."
        });
    }

    res.json({
        sucesso: true
    });
});

app.listen(porta, () => {
    console.log("Servidor funcionando!");
    console.log("Acesse: http://localhost:3000");
});