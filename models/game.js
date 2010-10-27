$.Model.extend('Game',
/* @Static */
{
	state : function(success, error){
		$.ajax({
			async: false,
			url: '/state',
			dataType: 'json',
			success: this.callback(['wrapMany',success]),
		})
	},
	set : function(x,y, success, error){
		$.ajax({
			async: false,
			url: '/set/'+x+'/'+y
		})
	},
	clear : function(x,y, success, error){
		$.ajax({
			async: false,
			url: '/clear/'+x+'/'+y
		})
	},
	step : function(success, error){
		$.ajax({
			async: false,
			url: '/step',
			dataType: 'json',
			success: this.callback(['wrapMany',success]),
		})
	},
	click : function(x,y,state){
		if("0" == state) {
			this.set(x, y);
		} else {
			this.clear(x, y);
		}
	}
},
/* @Prototype */
{})