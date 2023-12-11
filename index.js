import express from "express";
import { simpleRandom } from "./src/utils/randomNumber.js";
import { pokemons } from "./src/utils/pokemon.js";
import dotenv from "dotenv";
dotenv.config()

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
    console.log("Serveur allumé sur le port : ", port)
});

app.get("/random", async (req, res) => {
    try {
        const randomNumber = await simpleRandom();
        res.json({ Nombre : randomNumber })
    } catch {
        console.log(error)
    }
})

app.get("/pokemon/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const pokemon = pokemons.find((poke) => poke.id === id);
        if (!pokemon) {
            return res.status(404).send("Le pokemon n'existe pas");
        }

        const pokemonInfo = {
            nom: pokemon.name,
            type: pokemon.types
        }

        res.json({ pokemonInfo });
    } catch {
        res.status(500).send("Impossible de récupérer les données du pokemon");
    }
})