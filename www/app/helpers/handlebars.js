//
// ## helpers/config
//

define([
  'handlebars'
],

function (Handlebars) {

  "use strict";

  //
  // place {{ debug }}
  //
  Handlebars.registerHelper('debug', function (optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);

    if (optionalValue) {
      console.log("Value");
      console.log("====================");
      console.log(optionalValue);
    }
  });

  // Helper for SVG icons, turns {{#icon "user-1"}}{{/icon}}, for example, into this:
  Handlebars.registerHelper('icon', function(iconName, options) {
    var className = "icon";
    if(options.hash.className){
      className += " "+options.hash.className;
    }
    var out = '';
    out += '<div class="'+className+'">';
    out += '  <svg viewBox="0 0 32 32">';
    out += '    <use xlink:href="#'+iconName+'"></use>';
    out += '  </svg>';
    out += '</div>';
    return out;
  });

});
