angular.module('directives.debounce', [])
/*!
 * jQuery Orangevolt Ampere
 *
 * version : 0.2.0
 * created : 2013-08-15
 * source  : https://github.com/lgersman/jquery.orangevolt-ampere
 *
 * author  : Lars Gersmann (lars.gersmann@gmail.com)
 * homepage: http://www.orangevolt.com
 *
 * Copyright (c) 2013 Lars Gersmann; Licensed MIT, GPL
 */
.directive( 'ngAmpereDebounce', [ function() {
    var DEFAULTS = { timeout : 2000 }
    ;
    
    return {
        restrict    : 'A',	
        link        : function( scope, element, attrs) {
            // normalize directive options
            var options = scope.$eval( attrs.ngAmpereDebounce) || $.extend( {}, DEFAULTS);
            if( options==='leading') {
                options = $.extend( { leading : true}, DEFAULTS);
            } else {
                options.leading = !!options.leading;	// make it a real boolean
            }
            
            var map = $._data( element[0], 'events'),
                events = $.each( Object.keys( map), function( index, eventName) {
                    // ensure only real events are handled
                    if( eventName.charAt( 0)!='$') {
                        // install debounce mechanism
                        var debounced = $.debounce( options.timeout, options.leading, function( event) {
                            //console.log( 'debounce called');
                            
                            // iterate over all event handlers registered before ourself
                            // (remember : we moved ourself at first position while installing)
                            for( var i=$.inArray( debounce_handlerobj, map[eventName])+1; i<map[eventName].length; i++) {
                                var handlerobj = map[eventName][i];
                                
                                // call original event handler
                                handlerobj.handler.apply( this, arguments);
                                // emulate regular event dispatching by 
                                // aborting further propagation when event 
                                // has state immediatePropagationStopped
                                if( event.isImmediatePropagationStopped()) {
                                    break;
                                }
                            }
                        });
                        
                        element.on( eventName, function( event) {
                            debounced.apply( this, arguments);
                            // tell jquery to suppress further propagation of this event
                            event.stopImmediatePropagation();
                        });
                        
                        // move our debounce handler at first position
                        // to be called before any other
                        var debounce_handlerobj = map.input.pop();
                        map.input.unshift( debounce_handlerobj);
                    }
                })
            ;
        }
    };
}])


;