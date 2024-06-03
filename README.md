# Ollama-Python-Web-UI

Ce projet est très simple, il se résume a faire tourner un serveur localhost (port:5000) communiquant avec ollama. La communication sont est effectuer par le biais de l'interface web.

Le chemin est très simple :
 
1. La requête est envoyé (le message),
2. Le serveur reçois la requêtes,
3. Le serveur transmet la requête a ollama,
4. Une fois que le modèle choisis a fini sa réponse il transmet la réponse au serveur,
5. Et pour finir le serveur transmet la réponse sur le web.

Voici les fonctionnalité :
- Sélection du modèle (par défaut Llama 3 ou Phi 3)
- Animation d'envoie et de respection du message
- Utilisateur simultanée (avec un peu de latence)
- Compatibilité au niveaux de l'interface Pc & Smartphone
