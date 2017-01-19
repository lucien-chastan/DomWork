# DomWork

Mini framework JavaScript d'aide à la manipulation du DOM

## Raccourcis de sélection & Petites fonctions

**Raccourcis de sélection pour pointer un des éléments du DOM (syntaxe courte mais pas trop pour quand même comprendre le code) :**

- `byId('id')` = `document.getElementById('id')`
- `byClass('class')` = `document.getElementsByClassName('class')`
- `byTag('balise')` = `document.getElementsByTagName('balise')`
- `byName('name')` = `document.getElementsByName('name')`
- `byQueryAll('selecteur css')` = `document.querySelectorAll('selecteur css')`
- `byQuery('selecteur css')` = `document.querySelector('selecteur css')`

**Obtenire la hauteur et la largeur de l'écran (compatible avec IE) :**

- `var heightEcran = windowHeight()`
- `var widthEcran = windowWidth()`

**Ajouter ou remplacer des éléments attributs sur un nœud :**

```javascript
var imgId = new DomWork(byId('monImage'));
imgId.addAttributes({alt : 'texte altérnatif', title : 'mon title'});
```

**Ajouter ou remplacer du style sur un nœud :**

```javascript
var divId = new DomWork(byId('maDiv'));
divId.css({color : 'rgb(50,50,50)', padding : '12px'});
```

**Ajouter des fonctions sur un nœud :**  
si le paramètre *event* n'est pas stipulé, click sera pris par defaut  
si le paramètre *desc* n'est pas stipulé, par defaut la fonction sera ascendante, sinon mettre `desc : true`

```javascript
var divId = new DomWork(byId('maDiv'));
divId.addFunctions([
        {event : 'click', function : maFonction},
        {event : 'keyup', function : function(){fnAvecParametre(para1,para2);}},
        {event : 'keydown', function : fonctionDescendante, desc : true;}}
    ]);
```

## `Node.ajaxInsertHtml()` : insertion d'un fichier sur un nœud en ajax

Cette fonction ajoute le contenu du fichier ciblé au contenu d'un noeud  

**Atribut obligatoire**  
- `path` *(string)* : chemin du fichier à insérer

**Atributs optionnels**  
- `methode` *('poste' | 'get')* : methode à utiliser, valeur par defaut *get*
- `data` *(string | null)* : données à envoyer, valeur par defaut *null*
- `async` *(true | false)* : fonction synchrone ou asynchrone, valeur par defaut *true*
- `insertMode` *('innerHTML' | 'insertDomNode')* : mode d'insertion des données reçues, valeur par defaut *innerHTML*
- `loader` *(string | domJSON)* : HTML à insérer dans le noeud en attendant le chargement du fichier
- `onload` *(function)* : fonction à executer à la fin du chargement du fichier
- `onerror` *(function)* : fonction à executer en cas d'erreur dans le chargement (en développement)
- `onprogress` *(function)* : fonction à executer pendant le chargement du fichier (en développement)

**Exemple :**  
```javascript
var divId = new DomWork(byId('maDiv'));
divId.ajaxInsertHtml({
    path : 'monFichier.html',
    data : 'id=1&action=false',
    methode : 'get',
    insertMode : 'innerHTML',
    async : true,
    onload : function(){consol.log(fonction éxécutée à la fin du chargement)},
    onprogress : function(){consol.log(fonction éxécutée pendant le chargement)},
    onerror : function(){consol.log(fonction éxécutée en cas d'erreur)},
    loader : [{type : 'p', contents : 'patientez'}]
});
```

## `Node.insertDomNode()` : Création d'élément du DOM à partir d'un fichier JSON

Cette fonction créer dynamiquement des éléments du DOM à partir d'un tableau JSON, les tableaux peuvent être imbriqués pour créer des nœuds imbriqués

**Structure du JSON :**

```javascript
{
    type : 'balise de l'élément, div, ul, span, etc.',
    styles : 'JSON des styles et des valeurs, exemple :' {color : 'red', padding : '5px'},
    attributes : 'JSON des attributs et des valeurs, exemple :' {id : 'idDeMonBody'},
    contents : 'contenu de l'élément textuel ou un autre tableau JSON',
    functions : 'fonction à ajouter à l'élément, exemple :' 
        [
            {event : 'click', function : function(){alert('je suis une fonction');}},
            {event : 'keyup', function : function(){alert('function sur onkeyup');}}
        ]
}

ou

{
    texte : 'pour ajouter uniquement un element texte sans nœud'
}
```

Ci-dessous quelques exemples d'utilisation de la fonction `Node.insertDomNode()`


### Exemple : ajouter une div au body

Exemple simple d'ajout d'une div avec quelques éléments de style, des attributs (commme : class, id, etc.), un contenu textuel et une fonction

```javascript
var monBody = new DomWork(byTag('body')[0]new DomWork);

monBody.insertDomNode(
    [
        {
            type : 'div',
            styles : {color : 'red', padding : '5px', fontSize : '1.2em'},
            attributes : {id : 'idDeMaDiv', class : 'classDeMaDiv'},
            contents : 'je suis une div dans le body',
            functions : [{event : 'click', function : function(){alert('je suis une fonction');}}]
        }
    ]
);
```

### Exemple : création d'un liste à puce

```javascript
var monBody = new DomWork(byTag('body')[0]);

monBody.insertDomNode(
    [
        {
            type : 'ul',
            contents : [
                {type:'li', contents : 'puce 1'},
                {type:'li', contents : 'puce 2'},
                {type:'li', contents : 'puce 3'},
                {type:'li', contents : 'puce 4'}
            ],
        }
    ]
);
```

### Exemple : création d'un paragraphe avec du texte et un lien

```javascript
var monBody = new DomWork(byTag('body')[0]);

monBody.insertDomNode(
    [
        {
            type : 'p',
            contents : [
                {texte : 'du texte puis : ' },
                {type:'a', attributes : {href:'www.mon-lien.com'}, contents : 'un lien'},
                {texte : ' et encore du texte' }
            ],
        }
    ]
);
```

### Exemple : insertion d'une div avec pour contenu un fichier HTML chargé en ajax


```javascript 
var monBody = new DomWork(byTag('body')[0]);

monBody.insertDomNode(
    [
        {
            type : 'div',
            contents : [
                {ajax : {path : 'monFichier.html', data : 'id=1&nom=michel', methode : 'post'}}
            ],
        }
    ]
);
```
