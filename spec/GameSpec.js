describe("Game", function() {

	var game;
	var url;
	var oldAjax;
	
	beforeEach(function() {
		game = jQuery.Model.models['game'];
		oldAjax = jQuery.ajax;
		jQuery.ajax = function(call) {
		url = call['url'];
	};
	});

	afterEach(function() {
		jQuery.ajax = oldAjax;
	});

	it("should call set when an unset cell is clicked", function() {
		game.click(2,2,"0");
		expect(url).toBe("/set/2/2");
	});

	it("should call clear when a set cell is clicked", function() {
		game.click(2,2,"1");
		expect(url).toBe("/clear/2/2");
	});
	
	it("should call state when state is requested", function() {
		game.state();
		expect(url).toBe("/state");
	});
	
	it("should call step when step is requested", function() {
		game.step();
		expect(url).toBe("/step");
	});
	
})