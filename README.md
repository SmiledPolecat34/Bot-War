# Bot War API

    API de décision pour un bot sur grille.  
    Elle choisit un déplacement et une action selon : trophée > diamant (point), en évitant les bombes, avec des stratégies avancées pour poser des bombes intelligemment.

    🔗 Démo en ligne : - https://bot-war-p3m3.onrender.com/
                        - https://bot-war-p3m3.onrender.com/action

    ## 🧠 Logique principale

        ### Priorités
        1. **Récupérer le trophée** (valeur 20 pts) en priorité.  
            2. **Puis le diamant (point)** le plus proche (distance de Manhattan).  
                3. **Éviter les bombes** : le bot ne se déplace jamais dans une case contenant une bombe.  
                    4. **Collecte immédiate** : si un `move` amène sur un trophée ou un point, il renvoie dans la même réponse `"action": "COLLECT"` (pas besoin d'attendre un tour de plus).  
                        5. **Fallback sûr** : si aucune direction sûre n’est trouvée, le bot reste en place (`STAY`, `NONE`).

        ### Format de réponse :
            JSON :
                { "move": "UP", "action": "COLLECT" }
                    // ou exemple de bombe :
                { "move": "STAY", "action": "BOMB"}
