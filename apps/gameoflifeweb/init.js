include.resources();
include.engines();
include.plugins('model','view','controller','dom/fixtures','dom/form_params');

include(function(){ //runs after prior includes are loaded
  include.models('game');
  include.controllers('game');
  include.views();
});