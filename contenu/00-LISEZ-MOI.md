# Modifier les textes du site

Tous les textes du site sont dans ce dossier `contenu/`. Chaque fichier correspond à une partie du site :

| Fichier | Ce qu'il contient |
|---|---|
| `01-infos-generales.yaml` | Nom, email, téléphone, zone, horaires, réseaux sociaux, texte du bouton principal, bandeau de fin de page |
| `02-accueil.yaml` | Page d'accueil : grand titre, texte d'introduction, photo principale, titres des sections |
| `03-a-propos.yaml` | Votre présentation, vos chiffres clés, parcours, formations, valeurs |
| `04-prestations.yaml` | La liste des prestations (titre, description, pour qui, étapes) |
| `05-tarifs.yaml` | Les formules et prix, les infos pratiques, la FAQ |
| `06-avis-clients.yaml` | Les avis affichés sur la page d'accueil |
| `07-galerie.yaml` | Les photos de la galerie |
| `08-contact.yaml` | Les textes de la page contact |

---

## Les 5 règles d'or

**1. Ne modifiez que ce qui est APRÈS les deux-points.**

```yaml
titre: Bonjour, moi c'est Marion !
#      ↑ vous pouvez changer cette partie
# ↑ ne touchez pas au mot avant « : »
```

**2. Gardez les décalages en début de ligne.** Les espaces au début des lignes indiquent ce qui va ensemble. Ne les supprimez pas, et n'utilisez pas la touche Tab : seulement des espaces.

**3. Les listes commencent par un tiret « - ».** Pour ajouter un élément, copiez une ligne (ou un bloc entier) et collez-la juste en dessous, avec le même décalage.

```yaml
etapes:
  - Découverte de votre chiot
  - Mise en place des routines
  - Une nouvelle étape          ← ajoutée
```

**4. Les textes longs utilisent `>-`.** Écrivez le texte sur les lignes suivantes, décalé de 2 espaces de plus. Vous pouvez revenir à la ligne librement : tout sera affiché comme un seul paragraphe.

```yaml
texte: >-
  Un long texte qui peut continuer
  sur plusieurs lignes.
```

**5. Mettez des guillemets « " " » si le texte :**
- contient un deux-points suivi d'un espace, comme `Horaires : 9h – 19h` ;
- commence par `[`, `*`, `-`, `#` ou un chiffre suivi d'un point.

```yaml
horaires: "Horaires : du lundi au samedi"
```

---

## Textes à compléter

Les textes entre doubles crochets `[[ ... ]]` sont surlignés en jaune sur le site : ce sont des trous à remplir. Remplacez-les entièrement, crochets compris :

```yaml
# Avant
texte: Éducatrice canine depuis [[X]] ans
# Après
texte: Éducatrice canine depuis 8 ans
```

## Mettre un mot en valeur (titres de l'accueil)

Entourez le mot d'étoiles : `Éduquer avec *bienveillance*, accompagner avec *cohérence*`. Le mot s'affiche alors en écriture manuscrite orange.

## Ajouter une photo

1. Déposez votre photo dans le dossier **`public/images/`**. Nom conseillé : en minuscules, sans espaces ni accents, par exemple `marion-brownie.jpg`.
2. Écrivez son nom dans le bon champ :

```yaml
photo: marion-brownie.jpg
```

Laissez le champ vide pour afficher la zone « Photo à insérer ».

Conseils : format JPG ou WebP, environ 2000 px de large au maximum. Pour la galerie, indiquez `format: portrait`, `paysage` ou `carre`.

## Icônes disponibles

Pour les champs `icone:`, utilisez un de ces noms :

| Nom | Icône |
|---|---|
| `chien` | tête de chien |
| `maison` | maison |
| `pattes` | traces de pas |
| `coeur` | cœur |
| `poignee-de-main` | cœur et mains |
| `cerveau` | cerveau |
| `etincelles` | étincelles |
| `pousse` | jeune pousse |
| `etoile` | étoile |
| `soleil` | soleil |
| `arbres` | arbres |
| `groupe` | personnes |
| `lieu` | repère sur une carte |
| `carte-bancaire` | carte bancaire |
| `annulation` | flèche de retour |
| `calendrier` | calendrier coché |
| `patte` | patte de chien |
| `drapeau` | drapeau d'arrivée |
| `diplome` | toque de diplômé |
| `loupe` | loupe |

## Mise en avant d'une formule (tarifs)

`mise_en_avant: oui` affiche la formule en foncé, avec l'étiquette « Le plus choisi ». Mettez `non` pour les autres.

---

## En cas d'erreur

Si un fichier est mal écrit, le site affiche un message qui indique **le fichier et le champ à corriger**, par exemple :

```
Erreur dans contenu/05-tarifs.yaml :
  • formules › 2 › nom : Entrée invalide : chaîne de caractères attendu, indéfini reçu
```

Dans cet exemple, `formules › 2` désigne la **3e** formule : on compte à partir de 0. Il lui manque la ligne `nom:`.

En cas de doute, annulez la dernière modification (Ctrl+Z) et réessayez.
