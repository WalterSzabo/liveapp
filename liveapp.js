/*!
 * liveApp JS v1.0 (https://www.dimeda.at)
 * Copyright 2018 Walter Szabo
 * Licensed under Apache License 2.0 (https://www.apache.org/licenses/LICENSE-2.0)
 *
 */

if ( typeof( jQuery ) === 'undefined')
{
	throw new Error( 'liveApp-JS requires jQuery.' );
}


var
liveApp = liveApp || {};

liveApp.Device = {
	mobile: ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent )) ? ( true ) : ( false ),
	touch: ( ( 'ontouchstart' in window ) || ( navigator.maxTouchPoints && navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0 ) ) ? ( true ) : ( false ),
	localStorage: ( window.localStorage !== null ) ? ( true ) : ( false ),
	vibrate: ( navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate) ? ( true ) : ( false )
};

liveApp.Loader = {
	show: function ()
	{
		$( '.loader' ).removeClass( 'hidden' );
	},
	hide: function ()
	{
		$( '.loader' ).addClass( 'hidden' );
	}
};


// Joined File: _functions.js
// -----------------------------------------------------------
// FUNCTIONS
// -----------------------------------------------------------

/* ========================================================================
 * liveApp Sidebar
 * ======================================================================== */
(function( $ )
{
	'use strict';
	$.fn.sidebar = function( cmd )
	{
		var $overlay = $( '.sidebar__overlay' );

		if ( cmd == 'toggle' )
		{
			this.stop( true, true ).toggleClass( 'sidebar--show' );

			if ( $overlay.length > 0 )
			{
				$overlay.stop( true, true ).toggleClass( 'sidebar__overlay--show' );
			}
		}

		return this;
	};

	// API
	// =======================
	// $( '.sidebar' ).sidebar( 'toggle' );
	// <button type="button" data-toggle="sidebar">Sidebar</button>
	// <button type="button" data-toggle="sidebarNavgroup" data-target="#categories">Kategorien</button>
	$( document )
	.on( 'click', '[data-toggle="sidebar"]', function()
	{
		$( '.sidebar' ).sidebar( 'toggle' );
	})

/*
	.on( 'click', 'a.sidebar-btn', function( event )
	{
		event.preventDefault();
		$( '.sidebar' ).sidebar( 'toggle' );
	})
*/

	.on( 'click', '[data-toggle="sidebarNavgroup"]', function()
	{
		var selector = this.getAttribute( 'data-target' );
		$( this ).find( '.caret' ).toggleClass( 'js-rotate-180' );
		$( selector ).stop( true, true ).slideToggle( 'fast' );
	});

}( jQuery ));


/* ========================================================================
 * liveApp Toast
 * ======================================================================== */
(function( $ )
{
	'use strict';
	$.fn.toast = function( cmd )
	{
		if ( cmd == 'show' )
		{
			this.stop( true, true ).fadeIn( 400 ).delay( 3000 ).fadeOut( 400 );
		}

		return this;
	};

	// API
	// =======================
	// $( '#toast-site-added' ).toast( 'show' );
	// <button type="button" data-click="toast" data-target="#toast-site-added">Toast</button>
	$( document )
	.on( 'click', '[data-toggle="toast"]', function()
	{
		var selector = this.getAttribute( 'data-target' );
		$( selector ).stop( true, true ).fadeIn( 400 ).delay( 3000 ).fadeOut( 400 );
	});
}( jQuery ));




/*
		$( 'form#addSite' ).validateForm(
		{
			errorClass: 'missing-value',
			names: [
				'title',
				'href'
			],
			valid: function( data )
			{
			},
			error: function( msg )
			{
				console.warn( msg );
			}
		});


Wenn ein Feld nicht mit "required" geflaggt ist wird es nicht durchgereicht = BUG



*/
(function( $ )
{
	'use strict';
	$.fn.validateForm = function( options )
	{
		var
		stop = false,
		error = [],
		validFields = [];

		// Only by name="url" for example
		$.each( options.names, function( index, inputName )
		{
			var
			// If element is empty, check if element is radio, etc
			$element = $( '[name="' + inputName + '"][required]' ),
			inputValue = $element.val();

			// (1) Remove all Error-Messages on Load
			$element.removeClass( options.errorClass );

			// (2) Remove all Error-Messages on Press down Keys
			$element.on( 'keyup click', function()
			{
				$( this ).removeClass( options.errorClass );
			});

			// (3) Check if Input is empty
			if ( inputValue == '' )
			{
				$element.addClass( options.errorClass );
				error.push(
				{
					msg: 'Missing Value',
					field: inputName
				});
				stop = true;
			}
			else
			{
				validFields[inputName] = inputValue;
			}
		});

		if ( stop )
		{
			$( '[name="' + error[0].field + '"]' ).focus();
			options.error.call( this, error );
		}
		else
		{
			options.valid.call( this, validFields );
		}

		return this;
	};
}( jQuery ));









(function( $ )
{
	'use strict';
	// Add slideDown, slideUp animation to dropdown
	$( '.dropdown' ).closest( '.dropdown--slide' ).on( 'show.bs.dropdown', function()
	{
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).slideDown( 200 );
	});

	$( '.dropdown' ).closest( '.dropdown--slide' ).on( 'hide.bs.dropdown', function()
	{
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).slideUp( 200 );
	});


	// Add fadeIn, fadeOut animation to dropdown
	$( '.dropdown' ).closest( '.dropdown--fade' ).on( 'show.bs.dropdown', function()
	{
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeIn( 200 );
	});

	$( '.dropdown' ).closest( '.dropdown--fade' ).on( 'hide.bs.dropdown', function()
	{
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeOut( 200 );
	});
}( jQuery ));





(function( $ )
{
	'use strict';
	$( document ).on( 'click', '[data-click]', function()
	{
		var cmd = this.getAttribute( 'data-click' );

		if ( cmd == 'historyBack' )
		{
			window.history.back();
		}
		else if ( cmd == 'locationReload' )
		{
			window.location.reload();
		}
		// data-click="url:#!/Einstellungen"
		else if ( cmd.match(/\burl\:/gi) )
		{
			var href = cmd.split(':');
			window.location.href = href[1];
		}
	});
}( jQuery ));
