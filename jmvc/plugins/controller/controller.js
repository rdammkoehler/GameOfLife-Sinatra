/**
 * @tag core
 * Controllers organize event handlers through the power of <b>[jQuery.fn.delegate|event delegation]</b>. 
 * If something happens in your application (a user click or a [jQuery.Model|Model] instance being updated), 
 * a controller should respond to it. 
 * <h3>Benefits</h3>
 * <ul>
 *     <li><i>Controllers let you know where your code is!</i><p>
 *         Controllers force you to group events and label your html in specific ways.  The result is that
 *         if an event happens on the page, you know exactly where to find the code for that event.</p></li>
 *     <li><i>Controllers are inheritable.</i><p>
 *         Package, inherit, and reuse your widgets.</p></li>
 *     <li><i>Don't attach event handlers, make rules.</i><p>
 *         Controllers use event delegation.</p></li>
 * </ul>
 * <h3>Example</h3>
 * @codestart
//Instead of:
$(function(){
  $('#tasks').click(someCallbackFunction1)
  $('#tasks .task').click(someCallbackFunction2)
  $('#tasks .task .delete').click(someCallbackFunction3)
});

//do this
$.Controller.extend('TasksController',{
  'click': function(){...},
  '.task click' : function(){...},
  '.task .delete' : function(){...}
})
$().tasks_controller();
@codeend
 * <h2>Using Controllers</h2>
 * <p>A Controller is just a list of functions that get called back when the appropriate event happens.  
 * The name of the function provides a description of when the function should be called.  By naming your functions in the correct way,
 * Controller recognizes them as <b>[jQuery.Controller.Action Actions]</b> and hook them up in the correct way.</p>
 * 
 * <p>The 'hook up' happens when you create a [jQuery.Controller.prototype.init|new controller instance].</p>
 * 
 * <p>Lets look at a very basic example.  
 * Lets say you have a list of todos and a button you want to click to create more.
 * Your HTML might look like:</p>
@codestart html
&lt;div id='todos'>
    &lt;ol>
      &lt;li class="todo">Laundry&lt;/li>
      &lt;li class="todo">Dishes&lt;/li>
      &lt;li class="todo">Walk Dog&lt;/li>
    &lt;/ol>
    &lt;a id="create_todo">Create&lt;/a>
&lt;/div>
@codeend
To add a mousover effect and create todos, your controller class might look like:
@codestart
$.Controller.extend('TodosController',{
  ".todo mouseover" : function(el, ev){
      el.css("backgroundColor","red")
  },
  ".todo mouseout" : function(el, ev){
      el.css("backgroundColor","")
  },
  "#create_todo click" : function(){
      this.find("ol").append("&lt;li class='todo'>New Todo&lt;/li>"); 
  }
})
@codeend
Now that you've created the controller class, you've got attach the event handlers on the '#todos' div by
creating [jQuery.Controller.prototype.init|a new controller instance].  There are 2 ways of doing this.
@codestart
//1. Create a new controller directly:
new TodosController($('#todos')[0]);
//2. Use jQuery function
$('#todos').todos_controller();
@codeend

As you've likely noticed, when the [jQuery.Controller.static.init|controller class is created], it creates helper
functions on [jQuery.fn]. The "#todos" element is known as the <b>delegated</b> element.

<h3>Action Types</h3>
<p>Controller uses actions to match function names and attach events.  
By default, Controller will match [jQuery.Controller.Action.Event|Event] and [jQuery.Controller.Action.Subscribe|Subscribe] actions. 
To match other actions, include their plugins.</p>
<table>
	<tr>
        <th>Action</th><th>Events</th><th>Example</th><th>Description</th>
    </tr>
    <tbody  style="font-size: 11px;">
    <tr>
        <td>[jQuery.Controller.Action.Event Event]</td>
        <td>change click contextmenu dblclick keydown keyup keypress mousedown mousemove mouseout mouseover mouseup reset 
            windowresize resize windowscroll scroll select submit dblclick focus blur load unload ready hashchange</td>
        <td>"a.destroy click"</td>
        <td>Matches standard DOM events</td>
    </tr>
    <tr>
        <td>[jQuery.Controller.Action.Subscribe Subscribe]</td>
        <td>Any <a href="http://www.openajax.org/index.php">openajax</a> event</td>
        <td>"todos.*.create subscribe"</td>
        <td>Subscribes this action to OpenAjax hub.</td>
    </tr>
    <tr>
        <td>[jQuery.Controller.Action.Drag Drag]</td>
        <td>draginit dragend dragmove</td>
        <td>".handle draginit"</td>
        <td>Matches events on a dragged object</td>
    </tr>
    <tr>
        <td>[jQuery.Controller.Action.Drop Drop]</td>
        <td>dropover dropon dropout dropinit dropmove dropend</td>
        <td>".droparea dropon"</td>
        <td>Matches events on a droppable object</td>
    </tr>
    <tr>
        <td>[jQuery.Controller.Action.Lasso Lasso]</td>
        <td>lassoinit lassoend lassomove</td>
        <td>"#lassoarea lassomove"</td>
        <td>Allows you to lasso elements.</td>
    </tr>
    <tr>
        <td>[jQuery.Controller.Action.Selectable Selectable]</td>
        <td>selectover selected selectout selectinit selectmove selectend</td>
        <td>".selectable selected"</td>
        <td>Matches events on elements that can be selected by the lasso.</td>
    </tr>
    </tbody>
</table>

<h3>Callback Parameters</h3>
For most actions, the first two parameters are always:
<ul>
    <li>el - the jQuery wrapped element.</li>
    <li>ev - the jQuery wrapped DOM event.</li>
</ul>
@codestart
".something click" : function(el, ev){
   el.slideUp()
   ev.stopDelegation();  //stops this event from delegating to any other
                         // delegated events for this delegated element.
   ev.preventDefault();  //prevents the default action from happening.
   ev.stopPropagation(); //stops the event from going to other elements.
}
@codeend

If the action provides different parameters, they are in each action's documentation.


<h2>onDocument Controllers</h2>
<p>Sometimes, you want your controllers to delegate from the document or documentElement.  Typically this is
done in less complex applications where you know there will only be a single instance of the controller
on the page.</p>
<p>The advantage of onDocument Controllers is that they can be automatically attached to the document for you.</p>
To automatically attach to the document, add "onDocument: true" to your controller as follows:
@codestart
$.Controller.extend('TodosController',
{onDocument: true},
{
  ".todo mouseover" : function(el, ev){
      el.css("backgroundColor","red")
  },
  ".todo mouseout" : function(el, ev){
      el.css("backgroundColor","")
  },
  "#create_todo click" : function(){
      this.find("ol").append("&lt;li class='todo'>New Todo&lt;/li>"); 
  }
})
@codeend

 */
jQuery.Class.extend("jQuery.Controller",
/* @Static*/
{
    /**
     * Does 2 things:
     * <ol>
     *     <li>Creates a jQuery helper for this controller</li>
     *     <li> and attaches this element to the documentElement if onDocument is true</li>
     * </ol>   
     * <h3>jQuery Helper Naming Examples</h3>
     * @codestart
     * "TaskController" -> $().task_controller()
     * "Controllers.Task" -> $().controllers_task()
     * @codeend
     */
    init : function(){
        if(!this.className) return;
        this.underscoreName = jQuery.String.underscore(this.className.replace(/controllers?/i,""))
        this.underscoreControllerName = jQuery.String.underscore(this.fullName.replace(/\./g,'_'));

        var val, act;
        if(!this.modelName)
            this.modelName = jQuery.String.isSingular(this.underscoreName) ? this.underscoreName : jQuery.String.singularize(this.underscoreName)

        if(include.getPath().match(/(.*?)controllers/)){
            this._path = include.getPath().match(/(.*?)controllers/)[1]+"controllers";
        }else{
            this._path = include.getPath()+"/"
        }
        
        var controller = this;
        
        /**
         * @attribute onDocument
         * Set to true if you want to automatically attach this element to the documentElement.
         */
        if(this.onDocument){
            new this(document.documentElement);
        }else{
            
            jQuery.fn[this.underscoreControllerName] = function(){
                var instances = [];
                for(var i =0; i < this.length; i++){
                    var args = jQuery.makeArray(arguments);
                    args.unshift(this[i]);
                    var inst = (jQuery.data(this[i], "controllers") || {})[controller.fullName];
                    instances.push( inst ? inst : controller.newInstance.apply(controller, args)
                    )
                    args.shift();
                }
                return instances;
            }
            
        }
    },
	actions : [] //list of action types
},
/* @Prototype */
{
    /**
     * Does three things:
     * <ol>
     *     <li>Matches and creates actions.</li>
     *     <li>Set the controller's element.</li>
     *     <li>Saves a reference to this controller in the element's data.</li>
     * </ol>  
     * @param {HTMLElement} element the element this instance operates on.
     */
    init: function(element){
		var action_name, val, a, act;
        element = element.jquery ? element[0] : element;
        //needs to go through prototype, and attach events to this instance
        jQuery.className.add(element,  this.Class.underscoreControllerName );
        this._actions = [];
        for(action_name in this){
    		val = this[action_name];
    		if( typeof val == 'function' && action_name != 'Class'){
                for(a = 0 ; a < jQuery.Controller.actions.length; a++){
                    act = jQuery.Controller.actions[a];
                    if(act.matches(action_name)){
                        this._actions.push(new act(action_name, this.callback(action_name), this.Class.underscoreName,element, this ));
                    }
                }
            }
	    }
        /**
         * @attribute called
         * String name of current function being called on controller instance.  This is 
         * used for picking the right view in render.
         * @hide
         */
        this.called = "init";
        /**
         * @attribute element
         * The controller instance's delegated element.  This is set by [jQuery.Controller.prototype.init init].
         * It is a jQuery wrapped element.
         * @codestart
         * ".something click" : function(){
         *    this.element.css("color","red")
         * }
         * @codeend
         */
        this.element = jQuery(element);
		( jQuery.data(element,"controllers") || jQuery.data(element,"controllers",{}) )[this.Class.fullName] = this;
    },
    
    /**
     * Removes all actions on this instance.
     */
    destroy: function(){
        if(this._destroyed) throw this.Class.className+" controller instance has already been deleted";
        for(var i = 0; i < this._actions.length; i++){
            this._actions[i].destroy(this.element[0]);
        }
		delete this._actions;
		this._destroyed = true;
		//clear element
        var controllers = this.element.data("controllers");
		if(controllers && controllers[this.Class.fullName])
			delete controllers[this.Class.fullName]; //removes it from data
		this.element = null;
    },
    /**
     * Queries from the controller's delegated element.
     * @codestart
     * ".destroy_all click" : function(){
     *    this.find(".todos").remove();
     * }
     * @codeend
     * @param {String} selector selection string
     */
    find: function(selector){
        return this.element.find(selector);
    },
    /**
     * Publishes a message to OpenAjax.hub.
     * @param {String} message Message name, ex: "Something.Happened".
     * @param {Object} data The data sent.
     */
    publish: function(){
        OpenAjax.hub.publish.apply(OpenAjax.hub, arguments);
    },
	//tells callback to set called on this.  I hate this.
    _set_called : true
});


jQuery.fn.controllers = function(){
    var controllerNames = jQuery.Array.from(arguments), 
	   instances = [], 
	   controllers, 
	   cname;
    //check if arguments
	this.each(function(){
		controllers= jQuery.data(this, "controllers")
		if(!controllers) return;
		for(var cname in controllers){
			instances.push(controllers[cname])
		}
	})
	return instances;
};
jQuery.fn.controller = function(){
	return this.controllers.apply(this, arguments)[0];
};

(function(){
	var rd = jQuery.removeData
	jQuery.removeData = function(elem, name){
		elem = elem == window ?
			windowData :
			elem;
		var id = elem[ jQuery.data.expando ], controllers,cname;
		if(id && (!name || name == "controllers")){
			controllers = (jQuery.cache[ id ].controllers || {})
			for(cname in controllers) controllers[cname].destroy();
		}
		rd.apply(this, arguments)
	}
})();


/*
 * jQuery.Controller.Action is and abstract base class.
 * Controller Action classes are used to match controller prototype functions. 
 * Inheriting classes must provide a static matches function.
 * 
 * When a new controller is created, it iterates through its prototype functions and tests
 * each action if it matches.  If there is a match, the controller creates a new action.
 * 
 * The action is responsible to callback the function when appropriate.  It typically uses
 * dispatch_closure to call functions appropriately.  
 */
jQuery.Class.extend("jQuery.Controller.Action",
/* @Static */
{
    matches: function(action_name){
        if(!this.match) return null;
        return this.match.test(action_name);
    },
    /**
     * If the class has provided a matches function, adds this class to the list of 
     * controller actions.
     */
    init: function(){
        if(this.matches) jQuery.Controller.actions.push(this);
    }
},
/* @Prototype */
{
    /**
     * Called with prototype functions that match this action.
     * @param {String} action_name
     * @param {Function} f
     * @param {jQuery.Controller} controller
     */
    init: function(action_name, callback, className, element, controller){
        this.action = action_name;
        this.callback = callback;
        this.underscoreName = className;
        this.controller = controller;
    },
    /**
     * Disables an action.
     */
    destroy: function(){
        
    },
    /*
     * Splits the action name into its css and event parts.
     */
    css_and_event: function(){
        this.parts = this.action.match(this.Class.match);
        this.css = this.parts[1] || "";
        this.event_type = this.parts[2];
    },
    selector : function(elem){
        if(this.underscoreName.toLowerCase() == 'main') 
            return this.css;
        else if(elem == document.documentElement || elem == document)
            return '#'+this.underscoreName+(this.css ? ' '+this.css : '' );
        else
            return (this.css=="" ? '' : this.css);
    },
    delegates : function(elem){
        return jQuery.data(elem, "delegates") || jQuery.data(elem, "delegates",{});
    }
});
/**
 * Subscribes to an OpenAjax.hub event.
 * <h3>Example</h3>
@codestart javascript
TasksController = jQuery.Controller.extend('tasks',
{
  "task.create subscribe" : function(params){
     var published_data = params.data; //published data always in params.data
  }
});
@codeend
 */
jQuery.Controller.Action.extend("jQuery.Controller.Action.Subscribe",
/* @Static*/
{
    
    match: new RegExp("(opener|parent|window)?(~)?(.*?)\\s?(subscribe)$")
},
/* @Prototype*/
{
    /**
     * @param {Object} action
     * @param {Object} f
     * @param {Object} controller
     */
    init: function(action_name, callback, className, element, controller){
        this._super(action_name, callback, className, element, controller);
        this.message();
        this.subscription = this.who.OpenAjax.hub.subscribe(this.message_name, function(id, msg) {
            callback.call(controller, id, msg);
        });
    },
    /**
     * Gets the message name from the action name.
     */
    message: function(){
        var parts = this.action.match(this.Class.match);
        this.message_name = parts[3];
		this.who = parts[1] ? window[parts[1]] : window;
    },
    destroy : function(){
        OpenAjax.hub.unsubscribe(this.subscription)
        this._super();
    }
});
/*
 * Default event delegation based actions
 */
jQuery.Controller.Action.extend("jQuery.Controller.Action.Event",
/* @Static*/
{
    /**
     * Matches change, click, contextmenu, dblclick, keydown, keyup, keypress, mousedown, mousemove, mouseout, mouseover, mouseup, reset, resize, scroll, select, submit, dblclick, focus, blur, load, unload
     * @param {Object} action_name
     */
    match: new RegExp("^(?:(.*?)\\s)?(change|click|contextmenu|dblclick|keydown|keyup|keypress|mousedown|mousemove|mouseout|mouseover|mouseup|reset|windowresize|resize|windowscroll|scroll|select|submit|dblclick|focus|blur|load|unload|ready|hashchange)$")
},
/* @Prototype*/
{    
    init: function(action_name, callback, className, element, controller){
		this._super(action_name, callback, className, element, controller);
        this.css_and_event();
        
        var selector = this.selector(element);
        if(selector != null){
            this.delegator = new jQuery.Delegator(selector, this.event_type, this.get_callback(callback), element );
        }
    },
    get_callback : function(cb){
        return function(event){
            cb.call(null, jQuery(this), event);
        }
    },
    /*
     * Deals with main controller specific delegation (blur and focus)
     */
    main_controller: function(){
	    if(!this.css && jQuery.Array.include(['blur','focus'],this.event_type)){
            //todo
            var self = this;
            jQuery.event.add( window , this.event_type , 
                function(event){
                    self.callback(jQuery(window), event  )
                }
            );
            
            return;
        }
        return this.css;
    },
    /*
     * Gets the full css selector for this action
     * @return {String/null} returns a string css if Delegator should be used, null if otherwise.
     */
    selector : function(elem){
        if(jQuery.Array.include(['load','unload','windowresize','windowscroll','ready'],this.event_type)){
            this.attach_window_event_handler(this.event_type.replace("window",""));
            return;
        }
        return this._super(elem);
    },
	attach_window_event_handler: function(event_type) {
        var self = this;
        
        jQuery.event.add( event_type == "ready" ? document :window, event_type,
            function(event) {
                self.callback(jQuery(window), event);
            }
        );
    },
    
    destroy : function(){
        if(this.delegator) this.delegator.destroy();
        this._super();
    }
});
