# ICT-Bot

Projet de [bot telegram](https://telegram.org/blog/bot-revolution) permettant
d'obtenir les informations sur les modules disponibles pour les apprentis CFC en
voie [développement d'applications](https://www.ict-berufsbildung.ch/fr/formation-professionnelle/informaticien-ne-cfc-developpement-dapplications/),
selon l'[ordonnance 2014](https://www.ict-berufsbildung.ch/fileadmin/user_upload/02_Francais/01_formation_initiale/PDF/Bildungsverordnung_Informatiker_in_EFZ-100f-20131017TRR.pdf)
du [SEFRI](https://www.sbfi.admin.ch/sbfi/fr/home.html).

Les informations des modules se trouvent dans le fichier [data.json](./data.json)
et ont été récupérée sur [ICT Competence Framework](https://cf.ict-berufsbildung.ch/).
Les pages [de recherche de modules](https://cf.ict-berufsbildung.ch/modules.php?name=Mbk&a=20100&clang=fr) et [de visualisation du plan modulaire](https://cf.ict-berufsbildung.ch/modules.php?name=Mbk&a=20103&nvorlageid=15&nabschlussid=&clang=fr) sont la source
des informations présentes dans [data.json](./data.json).

## Plan modulaire

> La formation professionnelle en informatique est modularisée, c.à.d. elle est composée de descriptions de divers modules, respectivement de diverses compétences opérationnelles. Le plan modulaire comprend toutes les informations sur les modules et fixe, de manière obligatoire, les contenus de la formation ICT. Le plan modulaire est publique et est mis gratuitement à disposition.


# Utilisation du bot

Contactez [@ICTmodulesBot](https://t.me/ICTmodulesBot).

## Liste des commandes

| commande          | description                                                                   |
| ----------------- | --------------------------------------------------------                      |
| `/start`          | Commande initiale du bot, affiche l'aide                                      |
| `/help`, `/h`     | Affiche l'aide (description des commandes)                                    |
| `/module <ID>`    | Affiche les informations générales relatives au module en fonction de son ID  |
| `/list`, `/all`   | Affiche la liste de tous les modules                                          |
| `/info`           | Donne des informations générales sur le bot                                   |


# Liens

  * [Informaticien/-ne CFC Développement d'applications](https://www.ict-berufsbildung.ch/fr/formation-professionnelle/informaticien-ne-cfc-developpement-dapplications/)
  * [ICT Competence Framework](https://cf.ict-berufsbildung.ch/)
  * [Recherche de modules](https://cf.ict-berufsbildung.ch/modules.php?name=Mbk&a=20100)
  * [Visualisation des modules](https://cf.ict-berufsbildung.ch/modules.php?name=Mbk&a=20103&nvorlageid=15&nabschlussid=)
  * [Visualisation des modules (PDF)](https://cf.ict-berufsbildung.ch/modules.php?Mbk&a=20105&nvorlageid=15)
  * [Plan d’études pour les écoles professionnelles](https://www.ict-berufsbildung.ch/fileadmin/user_upload/PlanEtudesEcole_INFO_V1.0_du_1.4.2014.pdf)
