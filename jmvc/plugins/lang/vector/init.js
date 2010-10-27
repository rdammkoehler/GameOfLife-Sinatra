/**
 * @constructor
 * A vector class
 * @init creates a new vector instance from the arguments.  Example:
 * @codestart
 * new jQuery.Vector(1,2)
 * @codeend
 * 
 */

jQuery.Vector = function(){
    this.update( jQuery.makeArray(arguments) );
};
jQuery.Vector.prototype = 
/* @Prototype*/
{
    /**
     * Applys the function to every item in the vector.  Returns the new vector.
     * @param {Function} f
     * @return {jQuery.Vector} new vector class.
     */
    app: function(f){
          var newArr = [];
          
          for(var i=0; i < this.array.length; i++)
              newArr.push( f(  this.array[i] ) );
          var vec = new jQuery.Vector();
          return vec.update(newArr);
    },
    /**
     * Adds two vectors together.  Example:
     * @codestart
     * new Vector(1,2).plus(2,3) //-> &lt;3,5>
     * new Vector(3,5).plus(new Vector(4,5)) //-> &lt;7,10>
     * @codeend
     * @return {jQuery.Vector}
     */
    plus: function(){
        var args = arguments[0] instanceof jQuery.Vector ? 
                 arguments[0].array : 
                 jQuery.makeArray(arguments), 
            arr=this.array.slice(0), 
            vec = new jQuery.Vector();
        for(var i=0; i < args.length; i++)
            arr[i] = (arr[i] ? arr[i] : 0) + args[i];
        return vec.update(arr);
    },
    /**
     * Like plus but subtracts 2 vectors
     * @return {jQuery.Vector}
     */
    minus: function(){
         var args = arguments[0] instanceof jQuery.Vector ? 
                 arguments[0].array : 
                 jQuery.makeArray(arguments), 
             arr=this.array.slice(0), vec = new jQuery.Vector();
         for(var i=0; i < args.length; i++)
            arr[i] = (arr[i] ? arr[i] : 0) - args[i];
         return vec.update(arr);
    },
    /**
     * Returns the current vector if it is equal to the vector passed in.  
     * False if otherwise.
     * @return {jQuery.Vector}
     */
    equals : function(){
        var args = arguments[0] instanceof jQuery.Vector ? 
                 arguments[0].array : 
                 jQuery.makeArray(arguments), 
             arr=this.array.slice(0), vec = new jQuery.Vector();
         for(var i=0; i < args.length; i++)
            if(arr[i] != args[i]) return null;
         return vec.update(arr);
    },
    /*
     * Returns the 2nd value of the vector
     * @return {Number}
     */
    x : function(){ return this.array[0] },
    width : function(){ return this.array[0] },
    /**
     * Returns the first value of the vector
     * @return {Number}
     */
    y : function(){ return this.array[1] },
	height : function(){ return this.array[1] },
    /**
     * Same as x()
     * @return {Number}
     */
    top : function(){ return this.array[1] },
    /**
     * same as y()
     * @return {Number}
     */
    left : function(){ return this.array[0] },
    /**
     * returns (x,y)
     * @return {String}
     */
    toString: function(){
        return "("+this.array[0]+","+this.array[1]+")";
    },
    /**
     * Replaces the vectors contents
     * @param {Object} array
     */
    update: function(array){
        if(this.array){
            for(var i =0; i < this.array.length; i++) delete this.array[i];
        }
        this.array = array;
        for(var i =0; i < array.length; i++) this[i]= this.array[i];
        return this;
    }
};

