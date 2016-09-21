import Firebase from 'firebase'
import $ from 'jquery'

function firebaseStuff() {
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCgVDLG7oFBhixBxAR7JRKzChmyeAbs5G8",
		authDomain: "shareify-6aca2.firebaseapp.com",
		databaseURL: "https://shareify-6aca2.firebaseio.com",
		storageBucket: "shareify-6aca2.appspot.com",
		messagingSenderId: "1037040038814"
	};

    var myFirebaseRef = Firebase.initializeApp(config);

	return myFirebaseRef;
}

var fbAll = firebaseStuff();

export var myFirebaseRef = fbAll.database().ref();
export var myFirebaseAuth = fbAll.auth();
export var user = function() {
    return new Promise(function(resolve, reject){
        myFirebaseAuth.onAuthStateChanged(function globalOnAuth(authData) {
            if (authData) {
                resolve(myFirebaseAuth.currentUser);
            } else {
                reject(null);
            }
        });
    });
};
export var FirebaseLibrary = Firebase;
