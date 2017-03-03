# TP IDOD
Projet réaliser par Valentin Pitel, sur les bases du projet [stuff-sensor](https://github.com/pigne/stuff-sensors) réalisé par M.Pigne.

• Prérequis :
  - Télécharger le projet [random-sensors](https://github.com/pigne/random-sensors) qui permet de génèrerer des sensors aléatoires. 
    --> lancer en utilisant docker avec docker-compose up
    --> brocker : ws://localhost:8080
    
  - Utiliser le projet suivant [sensor-to-db](https://github.com/pigne/sensors-to-db) pour enregistrer les données dans mongodb(nécessaire pour l'affichage des historiques)
     --> npm install
     --> npm start
     
   - Télécharger [le serveur de l'api](https://github.com/vpailt/nodejs-server-server) créée pour les historiques
     --> npm install
     --> npm install mongoose
     --> npm start
     --> utilisation du port 8010
 
# Le projet Stuff-sensor 
• Installation:
    --> npm install
    --> npm install D3
    --> npm install axios
    --> npm star
   
• Fonctionalité effectuée :
  - Affichage des historiques en fonction d'un sensor et de 2 dates données (Jour, Mois, Année, Heure, Minute) en utilisant l'api généré par [Swagger](http://editor.swagger.io/#!/)
  
• L'application react est générée sur http://localhost:3000/liveSensor/
  
    
