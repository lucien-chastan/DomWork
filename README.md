#DomWork

Framework Js d'aide à la manipulation du DOM

## Raccourcis de selection de nœud

Raccourcis de sélection pour pointer un des éléments du DOM (syntaxe courte mais pas trop pour quand même comprendre le code)

- `byId('id')` = `document.getElementById('id')`
- `byClass('class')` = `document.getElementsByClassName('class')`
- `byTag('balise')` = `document.getElementsByTagName('balise')`
- `byName('name')` = `document.getElementsByName('name')`
- `byQueryAll('selecteur css')` = `document.querySelectorAll('selecteur css')`
- `byQuery('selecteur css')` = `document.querySelector('selecteur css')`

## La fonction `Node.insertDomNode()`

Cette fonction créer dynamiquement des éléments du DOM à partir d'un tableau JSON, les tableaux peuvent être imbriqués pour créer des nœuds imbriqués

**Structure du JSON :**

```
{
    type : 'balise de l'élément, div, ul, span, etc.',
    styles : 'JSON des attributs et des valeurs, exemple :' {color : 'red', padding : '5px', fontSize : '1.2em'},
    attributes : 'JSON des style et des valeurs, exemple :' {id : 'idDeMonBody', class : 'classDeMonBody'},
    contents : 'contenu de l'élément',
    functions : 'fonction à ajouter à l'élément, exemple : {[event : 'click', function : function(){alert('je suis une fonction');}]}
}

ou

{
    texte : 'pour ajouter uniquement un element texte sans nœud'
}
```

dans le propriété contents on peut mettre un autre tableau JSON pour imbriquer les éléments

Ci-dessous quelques exemples de d'utilisation de la fonction `Node.insertDomNode()`


### Exemple : ajouter une div au body

Exemple simple d'ajout d'une div avec quelques éléments de style, des attributs (commme : class, id, etc.), un contenu textuel et une fonction

``` 
var monBody = byTag('body')[0];

monBody.insertDomNode(
    [
        {
            type : 'div',
            styles : {color : 'red', padding : '5px', fontSize : '1.2em'},
            attributes : {id : 'idDeMaDiv', class : 'classDeMaDiv'},
            contents : 'je suis une div dans le body',
            functions : {[event : 'click', function : function(){alert('je suis une fonction');}]}
        }
    ]
)
```

### Exemple : création d'un liste à puce

``` 
var monBody = byTag('body')[0];

monBody.insertDomNode(
    [
        {
            type : 'ul',
            contents : {
                [
                    {type:'li', contents : 'puce 1'},
                    {type:'li', contents : 'puce 2'},
                    {type:'li', contents : 'puce 3'},
                    {type:'li', contents : 'puce 4'}
                ]
            },
        }
    ]
)
```

### Exemple : création d'un paragraphe avec du texte et un lien

``` 
var monBody = byTag('body')[0];

monBody.insertDomNode(
    [
        {
            type : 'p',
            contents : {
                [
                    {texte : 'du texte puis : },
                    {type:'a', attributes : {href:'www.mon-lien.com'}, contents : 'un lien'},
                    {texte : ' et encore du texte : }
                ]
            },
        }
    ]
)
```
