let fs = require('fs');                                                         // fs nous sert ici à écrire notre fichier
let axios = require('axios');                                                   // axios sert à réaliser une requête http
let cheerio = require('cheerio');                                               // on charge cheerio
let jsonframe = require('jsonframe-cheerio');                                   // et jsonframe-cheerio

axios('https://www.relaischateaux.com/us/destinations/europe/france').then((response) => {                      // on demande ici à axios d'aller sur relais et chateau.fr, si la réponse est bonne...
    fs.writeFileSync('grow.html', response.data);                                 // alors fs enregistre le code html dans le fichier gh.html
    if (response.status === 200) {                                              // si la réponse du serveur est 200 OK
        let $ = cheerio.load(response.data);                                    // on enregistre le contenu html dans une variable $
        jsonframe($);                                                           // cette dernière est placée dans une jsonframe
        var frame = {                                                           // on créé une autre variable frame qui nous permet de construire notre objet
            "post": {
                "selector": "[itemprop=itemListElement]",
                "data": [{
                    "name": "[itemprop=name]",                                  // tous les éléments qui nous intéressent sont décomposés ici
                    "url": {                                                    // pour les retrouver consultez la page gh.html
                        "selector": "[itemprop=url]",                           // et la documentation de jsonframe-cheerio
                        "attr": "content",
                    }
                }]
            }
        };
        var postsList = $('body').scrape(frame);                                // on créé une varibale postsList qui reprend les posts scrapés dans le body
        fs.writeFile('grow.json', JSON.stringify(postsList), function (err) {     // fs.WriteFile nous permet d'enregistrer nos données stockées dans postsList
            if (err) {
                return console.log(err);                                        
            } else {
                console.log("Le fichier est sauvegardé ! #OKLM");               
            }
        });
    };
});


