jQuery.Controller.extend('gameoflifeweb.Controllers.Game',
/* @Static */
{
	onDocument: true
},
/* @Prototype */
{
	load: function(){
		if(!$("#game").length) 
			$(document.body).append($(document.createElement('div')).attr('id','game'))
		Game.state(this.callback('list'));
	},
	list: function(game){
		$('#game').html(this.view('init', {game:game} ))
	},
	".cell click" : function(cell){
		Game.click(cell.attr("x"),cell.attr("y"),cell.html())
		Game.state(this.callback('list'))
	},
	".step click" : function(button,event) {
		Game.step();
		Game.state(this.callback('list'))
	}
});