import Firebase from 'firebase'
import $ from 'jquery'

function firebaseStuff() {
	function authDataCallback(authData) {
	  if (authData) {
	    console.log("User " + authData.uid + " is logged in with " + authData.provider);
	  } else {
	    console.log("User is logged out");
	  }
	}
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCgVDLG7oFBhixBxAR7JRKzChmyeAbs5G8",
		authDomain: "shareify-6aca2.firebaseapp.com",
		databaseURL: "https://shareify-6aca2.firebaseio.com",
		storageBucket: "shareify-6aca2.appspot.com",
		messagingSenderId: "1037040038814"
	};
	//const myFirebaseRef = Firebase.initializeApp(config);

    // the main firebase reference
    var rootRef = Firebase.initializeApp(config);

    // create the object to store our controllers
    var controllers = {};

    // Handle third party login providers
    // returns a promise
    function thirdPartyLogin(provider) {
        var deferred = $.Deferred();

        rootRef.authWithOAuthPopup(provider, function (err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }
        });

        return deferred.promise();
    };

    // Handle Email/Password login
    // returns a promise
    function authWithPassword(userObj) {
        var deferred = $.Deferred();
        console.log(userObj);
        rootRef.authWithPassword(userObj, function onAuth(err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }

        });

        return deferred.promise();
    }

    // create a user but not login
    // returns a promsie
    function createUser(userObj) {
        var deferred = $.Deferred();
        rootRef.createUser(userObj, function (err) {

            if (!err) {
                deferred.resolve();
            } else {
                deferred.reject(err);
            }

        });

        return deferred.promise();
    }

    // Create a user and then login in
    // returns a promise
    function createUserAndLogin(userObj) {
        return createUser(userObj)
            .then(function () {
            return authWithPassword(userObj);
        });
    }

    // authenticate anonymously
    // returns a promise
    function authAnonymously() {
        var deferred = $.Deferred();
        rootRef.authAnonymously(function (err, authData) {

            if (authData) {
                deferred.resolve(authData);
            }

            if (err) {
                deferred.reject(err);
            }

        });

        return deferred.promise();
    }

    // route to the specified route if sucessful
    // if there is an error, show the alert
    function handleAuthResponse(promise, route) {
        $.when(promise)
            .then(function (authData) {

            // route
            console.log('Want to send to route...', route);

        }, function (err) {
            console.log(err);
        });
    }

    /// Controllers
    ////////////////////////////////////////

    controllers.login = function (form) {

        // Form submission for logging in
        form.on('submit', function (e) {

            var userAndPass = $(this).serializeObject();
            var loginPromise = authWithPassword(userAndPass);
            e.preventDefault();

            handleAuthResponse(loginPromise, 'profile');
            return false;
        });

        // Social buttons
        form.children('.bt-social').on('click', function (e) {

            var $currentButton = $(this);
            var provider = $currentButton.data('provider');
            var socialLoginPromise;
            e.preventDefault();

            socialLoginPromise = thirdPartyLogin(provider);
            handleAuthResponse(socialLoginPromise, 'profile');

        });

        form.children('#btAnon').on('click', function (e) {
            e.preventDefault();
            handleAuthResponse(authAnonymously(), 'profilex');
        });

    };

    // logout immediately when the controller is invoked
    controllers.logout = function (form) {
        rootRef.unauth();
    };

    /// Initialize
    ////////////////////////////////////////

    $(function () {

        // whenever authentication happens send a popup
        rootRef.auth().onAuthStateChanged(function globalOnAuth(authData) {

            if (authData) {
            	console.log('Logged in');
            } else {
            	console.log('Logged out');
            }

        });

    });

	return rootRef;
}

var fbAll = firebaseStuff();

export const userId = "12345";
export const myFirebaseRef = fbAll.database().ref();
export const myFirebaseAuth = fbAll.auth();

