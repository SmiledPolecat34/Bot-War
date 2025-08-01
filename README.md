# Bot-War Remote Controller

Une petite app Express qui expose une API REST et une interface web pour piloter votre bot sur Bot Wars.

---

## Installation

```bash
git clone https://github.com/votre-orga/bot-war-controller.git
cd bot-war-controller
npm install


## Lancement 

# en local sur le port 3000
npm start
Ouvrez ensuite :
http://localhost:3000

## API

GET /action
Retourne la dernière commande envoyée.

Réponse 200
{ "move": "STAY", "action": "NONE" }

POST /action
Envoie une commande.
{ "move": "UP", "action": "COLLECT" }

move : UP | DOWN | LEFT | RIGHT | STAY
action : BOMB | COLLECT | NONE

Réponse 200
{ "status": "ok", "cmd": { "move": "UP", "action": "COLLECT" } }

Réponse 400 (invalidité)
{ "error": "Invalid move/action" }


## Interface
Les fichiers statiques se trouvent dans public/ :

index.html : la manette

style.css : styles

script.js : logique de la manette

server.js : logique serveur/client

## Tests
npm test

Couvre :

GET /action (valeur par défaut)
invalid move/action
GET /
404 sur route inconnue