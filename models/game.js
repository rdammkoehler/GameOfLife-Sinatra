$.Model.extend('Game',
/* @Static */
{
	state : function(success, error){
		$.ajax({
			async: false,
			url: '/state',
			dataType: 'json',
			success: this.callback(['wrapMany',success]),
			error: error
		})
	},
	set : function(x,y, success, error){
		$.ajax({
			async: false,
			url: '/set/'+x+'/'+y,
			success: this.callback(['wrapMany',success]),
			error: error
		})
	},
	clear : function(x,y, success, error){
		$.ajax({
			async: false,
			url: '/clear/'+x+'/'+y,
			success: this.callback(['wrapMany',success]),
			error: error
		})
	},
	step : function(success, error){
		$.ajax({
			async: false,
			url: '/step',
			dataType: 'json',
			success: this.callback(['wrapMany',success]),
			error: error
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