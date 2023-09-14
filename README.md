# OC-P12: Développez un tableau de bord d'analytics avec React

Ce projet a été initialisé avec [Create React App](https://github.com/facebook/create-react-app).

## Scripts disponibles

Dans le répertoire du projet, vous pouvez exécuter :

### `yarn start`

Exécute l'application en mode développement.\
Ouvrez [http://localhost:3300](http://localhost:3300) pour l'afficher dans votre navigateur.\
_Note: le **port** du serveur a été **modifié** pour ne pas entrer en conflit avec celui de l'API._

### `yarn start-mock-api`

Lance JSON Server pour accéder au données mockées.

-   Url: <http://localhost:3330>

-   Endpoints:

    <http://localhost:3330/user/:userId>\
    <http://localhost:3330/user/:userId/activity>\
    <http://localhost:3330/user/:userId/average-sessions>\
    <http://localhost:3330/user/:userId/performance>

Pour réaliser le projet j'ai d'abord mis en place un mock de l'API à l'aide de [json-server](https://github.com/typicode/json-server).\
Vous pourrez trouver le code de ce mock dans le dossier `/mock-api`.\
L'API mockée se comporte comme le [back-end](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard).

## Documentation du gestionnaire d'Api

Les modules permettant la gestion d'API se trouvent dans le dossier `/src/api`.

### 1. Paramétrez les endpoints

La fonction `setEndpoint` permet de paramétrer un endpoint pour les appels API.

#### Paramètres:

-   `params` (Object) : Un objet contenant les paramètres suivants :
    -   `route` (string) : Le chemin du endpoint.
    -   `field` (string) : Le champ de données du endpoint.
    -   `output` (function) : La fonction à appliquer sur les données sortantes.

_Note: pour le paramètre `route` il est possible d'utiliser des segments de chemin variables en les préfixant avec ':' (ex: '/user/:id')._

#### Exemple:

Commencez par paramétrer vos endpoints:

-   Importez la fonction `setEndpoint` depuis `/src/apiHandler.js`
-   Déclarez vos endpoints dans un objet littéral en les initialisant avec `setEndpoint`

```javascript
// Exemple: fichier 'apiConstants.js'
import { setEndpoint } from './apiHandler'
import { UserEntity, UserInfoEntity } from './Entities'

export const endpoints = {
    user: setEndpoint({
        route: '/user/:userId',
        field: 'data',
        output: (data) => new UserEntity(data),
    }),
    userInfo: setEndpoint({
        route: '/user/:userId/info',
        field: 'data',
        output: (data) => new UserInfoEntity(data),
    }),
}
```

### 2. Paramétrez le gestionnaire d'API

La classe `ApiHandler` est utilisée pour gérer les appels à une API en fournissant une interface pour configurer et effectuer des requêtes vers différents endpoints. (C'est une classe statique qui ne doit pas être instanciée.)

#### Fonction set():

`ApiHandler.set(url: string, endpoints: Object.<string, EndpointSettings>)`

-   Description: Initialise `ApiHandler` avec l'URL de base de l'API et la configuration des endpoints.

#### Paramètres:

-   `url` (string) : L'URL de base de l'API.
-   `endpoints` (Object) : Paramètres des endpoints sous la forme d'un objet comme vu précédemment.

#### Exemple:

Ensuite, paramétrez votre gestionnaire d'API:

-   Importez la classe `ApiHandler` depuis `/src/apiHandler.js`
-   Initialisez votre gestionnair d'API avec les paramètres requis

```javascript
// Exemple: fichier 'apiConstants.js'
import { setEndpoint, ApiHandler } from './apiHandler'
import { UserEntity, UserInfoEntity } from './Entities'

export const endpoints = {
    // configuration des différents endpoints.
}

// Gestionnaire d'API.
ApiHandler.set('http://api.example.com', endpoints)
```

### 3. Utilisez le composant React `DataLoadingWrapper`

#### Description:

Le composant DataLoadingWrapper est utilisé pour gérer les appels à l'API en prenant en charge le chargement, les erreurs et la mise à jour des enfants. Il permet d'encapsuler plusieurs composants enfants qui dépendent des données provenant d'endpoints API spécifiques. Lorsque les données sont chargées avec succès, les composants enfants sont rendus. En cas d'échec de la requête ou pendant le chargement, un message d'erreur ou un indicateur de chargement sont affichés.

#### Utilisation:

Propriétés:

-   `endpoints` (Array) : Un tableau d'objets représentant les endpoints d'API à interroger.

-   `endpointsArgs` (Objet) : Des arguments spécifiques aux endpoints, généralement utilisés pour personnaliser les requêtes API en fonction de paramètres spécifiques (Segments de chemin variables préfixés avec ':' (ex: si `endpointsArgs = { id: 18 }`, la route '/user/:id' deviendra '/user/18')).

-   (optionel) `errorMessage` (string) : Un message d'erreur à afficher en cas d'échec des requêtes API.

Prérequis:

-   Chaque composant enfant qui dépend des données doit posséder une propriété `data`

-   Désignez les composants enfants qui dépendent des données en leurs passant une prop `endpoints` contenant un tableau d'objets représentant les endpoints requis

-   Utiliser l'objet de configuration des endpoints précedemment créé.

**Exemple:**

Une fois vos endpoints et votre gestionnaire d'API configurés:

-   Importez votre objet `endpoints` precedemment défini
-   Importez le composant `DataLoadingWrapper` depuis `/src/api/components/DataLoadingWrapper`

```jsx
// Api
import { endpoints } from './apiConstants'
import DataLoadingWrapper from './DataLoadingWrapper'

function Component() {
    return (
        <DataLoadingWrapper endpoints={Object.values(endpoints)} endpointsArgs={{ userId: 18 }}>
            <div className="parentWrapper">
                <ChildComponent_1 endpoints={[endpoints.user]} />
                <div>
                    <ChildComponent_2 endpoints={[endpoints.user]} />
                    <ChildComponent_3 endpoints={[endpoints.userInfo]} />
                </div>
            </div>
        </DataLoadingWrapper>
    )
}
```

#### Remarques:

-   Le composant DataLoadingWrapper prend en charge le chargement asynchrone des données d'API et gère les erreurs, ce qui simplifie la gestion des requêtes API dans votre application.

-   `endpoints` (Array) : Il n'est pas nécessaire d'interroger tous les endpoints, libre à vous de définir votre tableau.

-   `endpointsArgs` (Objet) : Plusieurs arguments spécifiques aux endpoints peuvent être spécifiés.

-   Un composant enfant qui dépend des données peut réclamer plusieurs endpoints.

-   Il est possible de désigner un conteneur parent pour le message d'erreur et le loading spinner en lui attribuant la classe CSS `parentWrapper`, si cette classe CSS n'est pas spécifiée, un conteneur par défaut est utilisé.

-   Assurez-vous de fournir les configurations correctes des endpoints en utilisant les outils précedemment exposés dans cette documentation.
