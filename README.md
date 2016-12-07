#DomWork

Framework Js d'aide à la manipulation du DOM HTML

## Raccourcis de selection de nœu

Raccourcis de selection pour pointer un élément du DOM (syntaxe courte mais pas trop pour quand même comprendre le code)

- `byId('id')` = `document.getElementById('id')`
- `byClass('class')` = `document.getElementsByClassName('class')`
- `byTag('balise')` = `document.getElementsByTagName('balise')`
- `byName('name')` = `document.getElementsByName('name')`
- `byQueryAll('selecteur css')` = `document.querySelectorAll('selecteur css')`
- `byQuery('selecteur css')` = `document.querySelector('selecteur css')`

## ajouter des nœods au DOM

Quelques exemples de d'utilisation de la fonction `Node.insertDomNode()` pour l'ajout dynamique de nœud au DOM

### Basic : ajouter une div au body

exemple simple d'ajout d'une div avec quelques éléments de style, des attributs (commme : class, id, etc.) et un contenu textuel

``` 
var monBody = byTag('body')[0];

monBody.insertDomNode(
    [
        {
            type : 'div',
            styles : {color : 'red', padding : '5px', fontSize : '1.2em'},
            attributes : {id : 'idDeMonBody', class : 'classDeMonBody'},
            contents : 'je suis une div dans le body'
        }
    ]
)
```