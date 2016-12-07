/*****************************************************************************************************************/
/*                                                                                                               */
/*                                Bibliothèque  MIW   version miw V  16 11 2016.js                                */
/*                                Réalisée dans le cadre des cours Javascript                                    */
/*                                De la Licence Activités et Techniques de Communication                         */
/*                                Mention Multimédia Internet Webmaster   (MIW)                                  */
/*                                IUT d'Aix-en-Provence Département GEA GAP                                      */
/*                                Site internet de la licence :     www.gap.univ-mrs.fr/miw                      */
/*                                                                                                               */
/*****************************************************************************************************************/

(function(){  // ief  ou fie fonction immédiatement exécutée.

/******************************************************************************************************/
/***********************  Les expressions régulières    ***********************************************/
/******************************************************************************************************/ 
		Reg = {											               // objet contenant des expressions régulières
			required :  /[^.*]/,
			alpha :     /^[a-z ._-]+$/i,
			alphanum :  /^[a-z0-9 ._-]+$/i,
			digitSign : /^[-+]?[0-9]+$/,
			digit:/^[0-9]+$/,
			nodigit : /^[^0-9]+$/,
			number : /^[-+]?\d*\.?\d+$/,
			email : /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
			phone : /^[\d\s().-]+$/,
			url : /^(http|https):\/\/[a-z0-9\-\.\/_]+\.[a-z]{2,3}$/i,
			tag : /<[^<>]+>/g ,                                        // pour rechercher toutes les occurences d'une balise HTML ou XML
            script : /(<script).+(<\/script>)/gi,                      // pour rechercher toutes les occurences de script
            			
		};


/*****************************************************************************************************/
/***********************  Les Raccourcis   pour le DOM  ***********************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/***********************  Les Raccourcis   pour le DOM  ***********************************************/
/******************************************************************************************************/

/* recherche de noeuds */

    _id = function(id) {return document.getElementById(id);};
    _tn = function(tn) {return document.getElementsByTagName(tn);};
    _n  = function(n) {return document.getElementsByName(n);};
    _ = function(css) {return document.querySelectorAll(css);};
    _cf = function() {return createDocumentFragment();};
    
    
    String.prototype.Css = function(){
        var table = this.split('-');
        for(var i = 1 ; i < table.length ; i++){
            table[i] = table[i].capitalize();
        }
        return table.join('');
    }
    
    //Ajoute du CSS sur un noeud
    Node.prototype.css = function(arrayCss){
        for(var i in arrayCss){
            this.style[i.Css()] = arrayCss[i];
        }
    }
    
    //Ajoute des attributs au node
    Node.prototype.AddAttributes = function(arrayAttributes){
        for(var i in arrayAttributes){
            this.setAttribute(i,arrayAttributes[i]);
        }
    }    
    
    
    //FONCTION D'AJOUT D'UNE ARBORESENCE DE NODE SUIVANT UN JSON
    Node.prototype.insertDomNode = function(NodeJson){
        
        //création d'un fragment de document
        document.createDocumentFragment();
        
        //boucle sur le JSON
        this.jsonLoopNode(NodeJson);
    }
    
    Node.prototype.jsonLoopNode = function(NodeJson){
        for(var i = 0; i < NodeJson.length ; i++){
            
            this.creatNode(
                NodeJson[i]['type'],
                NodeJson[i]['attributs'],
                NodeJson[i]['styles'],
                NodeJson[i]['contents']
            );
        }
    }
    
    Node.prototype.creatNode = function(type, attributs, styles, contents){
        var element = this.createNodeElement(type);
        
        //application du style et des attributs
        element.css(styles);
        element.AddAttributes(attributs);
        
        //si c'est un objet, on boucle dessus, sinon on insert le text
        if(typeof(contents) == 'object')
            element.jsonLoopNode(contents);
        else
            element.creatTextElement(contents);
        return element;
    }
    
    Node.prototype.createNodeElement = function(type){
        var element = document.createElement(type);
        if(this != 'undefined')
            this.appendChild(element);
        return element;
    }
    
    Node.prototype.creatTextElement = function(text){
        var element = document.createTextNode(text);
        if(this != 'undefined')
            this.appendChild(element);
        return element;
    }
    
    Node.prototype.deleteNode = function(){
        var parent = this.parentNode;
        parent.removeChild(this);
    }
    


/******************************************************************************************************/
/***********************  Extension de toutes les classes avec la methode extend  *********************/
/******************************************************************************************************/				
		String.prototype.extend=function(obj){  
									for( var i in obj){this[i] =obj[i]};
								};
		Array.prototype.extend=function(obj){  
									for( var i in obj){this[i] =obj[i]};
								};
		Number.prototype.extend=function(obj){  
									for( var i in obj){this[i] =obj[i]};
								};
		Node.prototype.extend=function(obj){  
									for( var i in obj){this[i] =obj[i]};
								};
								
/******************************************************************************************************/
/***********************  Extension de la clase String  ***********************************************/
/******************************************************************************************************/			
		String.prototype.extend({
			left : function(n){return this.substring(0,n)},
			right : function(n){return this.substring(this.length-n)},
			convertCss: function(){	
					var ch =this, reg1=/-[a-z]/gi, reg2=/-/g;
					if (ch.match(reg1)){
						for (var i = 0 ; i< ch.match(reg1).length; i++){
							 ch = ch.replace(ch.match(reg1)[i],ch.match(reg1)[i].toUpperCase())
						}
						ch = ch.replace(reg2,"")
					}
					return ch;
			},
			capitalize: function(){
					return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
			},
			trim: function(){
			        return this.replace(/(^\s*|\s*$)/g,"")
			}
		});
/******************************************************************************************************/
/***********************  Extension de la clase Array   ***********************************************/
/******************************************************************************************************/		
		
		Array.prototype.extend({
			merge : function(t){ 
					for (var i =0; i< t.length;i++){
						 this.push(t[i]);
					}
					return this
			}			
		});
/******************************************************************************************************/
/***********************  Extension de la clase Number  ***********************************************/
/******************************************************************************************************/		
		Number.prototype.extend({
			p : function(n){ return Math.pow(this,n)}
		});		
/******************************************************************************************************/
/***********************  Extension de la clase Node    ***********************************************/
/******************************************************************************************************/		
		Node.prototype.extend({
			changeId : function(val){ 
					this.id=val;
					return this;
			},
			css : function(obj) {
					for( var i in obj){
						this.style[i.convertCss()]=obj[i];
					};
					return this;
			}
		});	

				
})();

 
