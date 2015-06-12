var app = angular.module('findPlayDate');

var english = {
	HEADER: {
		FILTER_PLATFORM: 	'Filter by platform',
		FILTER_GAME: 		"Filter by {{platform}}-game",
		FILTER_TIMEZONE: 	'and/or timezone',
		FILTER_LANGUAGE: 	'and/or language',
		ADD_PLAYDATE: 		'add playdate'
	},
	CREATEMODAL: {
		SELECT_PLATFORM: 	"select platform",
		FILTER_GAME: 		"select {{platform}}-game",
		TIMEZONE: 			"Your timezone?",
		NAME:  				"Your (ingame) name?",
		GAME: 				"-game?",
		EMAIL: 				"Your e-mail?",
		LANGUAGE: 			"pref. language?",
		MIC: 				"Mic required",
		GROUP: 				"We are a group",
		INFO: 				"Additional info?",
		REQUIRED_GAME: 		"You have not entered a game",
		REQUIRED_TIMEZONE: 	"You have not entered a timezone",
		REQUIRED_LANGUAGE: 	"You have not entered a language",
		REQUIRED_EMAIL: 	"You have not entered an email",
		REQUIRED_NAME: 		"You must enter a name",
		REQUIRED_INFO: 		"You have not entered additional info",
		ERR_GAME: 			"Select a game from the Dropdown",
		ERR_REGION: 		"Select a region from the Dropdown",
		ERR_EMAIL: 			"This is not a valid e-mail address",
		SAVE: 				"save",
		CANCEL: 			"cancel"
	},
	MAIN: {
		HEADLINE: 			"{{username}} would like to play on <b>{{platform}}</b>",
		TIMEZONE: 			"Timezone",
		LANGUAGE: 			"Language",
		MESSAGE: 			"message {{username}}",
		MIC: 				"A mic is required",
		GROUP: 				"A group wants to play",
		PREFERENCES: 		"Preferences"
	},
	UPDATEMODAL: {
		SAVE: 				"save",
		CANCEL: 			"cancel",
		DELETE: 			"delete"
	}
};

//thanks  shinmai_rookie @ reddit
var spanish = {
    HEADER: {
        FILTER_PLATFORM:    'Filtrar según la plataforma',
        FILTER_GAME:        "Filtrar según el juego de {{platform}}",
        FILTER_TIMEZONE:    'y/o el huso horario',
        FILTER_LANGUAGE:    'y/o el idioma',
        ADD_PLAYDATE:     	'crear una playdate'
    },
    CREATEMODAL: {
        SELECT_PLATFORM:    "seleccione una plataforma",
        FILTER_GAME:        "seleccione un juego de {{platform}}",
        TIMEZONE:           "Huso horario",
        NAME:               "Nombre de usuario en el juego",
        GAME:               "Juego de {{platform}}",
        EMAIL:              "Dirección de correo electrónico",
        LANGUAGE:           "Idioma",
        MIC:                "Se necesita micrófono",
        GROUP:              "Somos un grupo",
        INFO:               "Información adicional",
        REQUIRED_GAME:      "No has seleccionado un juego",
        REQUIRED_TIMEZONE:  "No has seleccionado un huso horario",
        REQUIRED_LANGUAGE:  "No has introducido tu idioma",
        REQUIRED_EMAIL:     "No has introducido una dirección de correo electrónico",
        REQUIRED_NAME:      "Debes introducir un nombre",
        REQUIRED_INFO:      "No has introducido información adicional",
        ERR_GAME:           "Selecciona un juego de la lista",
        ERR_REGION:         "Selecciona una región de la lista",
        ERR_EMAIL:          "Esta no es una dirección de correo electrónico válida",
        SAVE:               "guardar",
        CANCEL:             "cancelar"
    },
    MAIN: {
        HEADLINE:           "A {{username}} le gustaría jugar a un juego de <b>{{platform}}</b>",
        TIMEZONE:           "Huso horario",
        LANGUAGE:           "Idioma",
        MESSAGE:            "Enviar un mensaje a {{username}}",
        MIC:                "Se necesita un micrófono",
        GROUP:              "Un grupo quiere jugar",
        PREFERENCES:        "Preferencias"
    },
    UPDATEMODAL: {
        SAVE:               "guardar",
        CANCEL:             "cancelar",
        DELETE:             "eliminar"
    }
};

//thanks  shinmai_rookie @ reddit
var galician = {
    HEADER: {
        FILTER_PLATFORM:    'Filtrar segundo a plataforma',
        FILTER_GAME:        "Filtrar segundo o xogo da {{platform}}",
        FILTER_TIMEZONE:    'e/ou o fuso horario',
        FILTER_LANGUAGE:    'e/ou a lingua',
        ADD_PLAYDATE:     	'crear unha playdate'
    },
    CREATEMODAL: {
        SELECT_PLATFORM:    "escolla unha plataforma",
        FILTER_GAME:        "escolla un xogo da {{platform}}",
        TIMEZONE:           "Fuso horario",
        NAME:               "Nome de usuario no xogo",
        GAME:               "Xogo da {{platform}}",
        EMAIL:              "Enderezo de correo electrónico",
        LANGUAGE:           "Idioma",
        MIC:                "Necesítase micrófono",
        GROUP:              "Somos un grupo",
        INFO:               "Información adicional",
        REQUIRED_GAME:      "Non escolliches un xogo",
        REQUIRED_TIMEZONE:  "Non escolliches un fuso horario",
        REQUIRED_LANGUAGE:  "Non introduciches o teu idioma",
        REQUIRED_EMAIL:     "Non introduciches o teu enderezo de correo electrónico",
        REQUIRED_NAME:      "Debes introducir un nome de usuario",
        REQUIRED_INFO:      "Non introduciches información adicional",
        ERR_GAME:           "Escolle un xogo da lista",
        ERR_REGION:         "Escolle unha rexión da lista",
        ERR_EMAIL:          "Este non é un enderezo de correo electrónico válido",
        SAVE:               "gardar",
        CANCEL:             "cancelar"
    },
    MAIN: {
        HEADLINE:           "{{username}} quere xogar a un xogo de <b>{{platform}}</b>",
        TIMEZONE:           "Fuso horario",
        LANGUAGE:           "Idioma",
        MESSAGE:            "Enviar unha mensaxe a {{username}}",
        MIC:                "Necesítase un micrófono",
        GROUP:              "Un grupo quere xogar",
        PREFERENCES:        "Preferencias"
    },
    UPDATEMODAL: {
        SAVE:               "gardar",
        CANCEL:             "cancelar",
        DELETE:             "eliminar"
    }
};

var german = {
	HEADER: {
		FILTER_PLATFORM: 	'Nach Plattform filtern',
		FILTER_GAME: 		"Nach {{platform}}-Spiel",
		FILTER_TIMEZONE: 	'und Zeitzone',
		FILTER_LANGUAGE: 	'und Sprache',
		ADD_PLAYDATE: 		'hinzufügen'
	},
	CREATEMODAL: {
		SELECT_PLATFORM: 	"Plattform?",
		FILTER_GAME: 		"{{platform}}-Spiel wählen",
		TIMEZONE: 			"Zeitzone?",
		NAME:  				"(Ingame) Name?",
		GAME: 				"-Spiel?",
		EMAIL: 				"Deine E-Mail?",
		LANGUAGE: 			"bev. Sprache?",
		MIC: 				"Mic benötigt?",
		GROUP: 				"Wir sind eine Gruppe",
		INFO: 				"Zusätzliche Infos?",
		REQUIRED_GAME: 		"Du hast kein Spiel ausgewählt",
		REQUIRED_TIMEZONE: 	"Du hast keine Zeitzone ausgewählt",
		REQUIRED_LANGUAGE: 	"Du hast keine Sprache ausgewählt",
		REQUIRED_EMAIL: 	"Du hast keine E-Mail angegeben",
		REQUIRED_NAME: 		"Du musst einen Namen angeben",
		REQUIRED_INFO: 		"Du musst das Info feld ausfüllen",
		ERR_GAME: 			"Wähle nur Spiele aus dem Dropdown",
		ERR_REGION: 		"Wähle nur Zeitzonen aus dem Dropdown",
		ERR_EMAIL: 			"Das ist keine gültige E-Mail Addresse",
		SAVE: 				"speichern",
		CANCEL: 			"abbr."
	},
	MAIN: {
		HEADLINE: 			"{{username}} würde gerne auf <b> {{platform}} </b> spielen",
		TIMEZONE: 			"Zeitzone",
		LANGUAGE: 			"Sprache",
		MESSAGE: 			"nachricht an {{username}}",
		MIC: 				"Ein Microfon wird benötigt.",
		GROUP: 				"Eine Gruppe möchte spielen",
		PREFERENCES: 		"Vorlieben"
	},
	UPDATEMODAL: {
		SAVE: 				"speichern",
		CANCEL: 			"abbr.",
		DELETE: 			"löschen"
	}
};

app.config(['$translateProvider', function ($translateProvider) {
	$translateProvider
		.translations('en', english)
		.translations('de', german)
		.translations('es', spanish)
		.translations('gl', galician)
		.registerAvailableLanguageKeys(['en', 'de', 'es', 'gl'], {
			'en_US': 'en',
			'en_UK': 'en',
			'de_DE': 'de',
			'de_CH': 'de',
			"es_AR": 'es',
			"es_GT": 'es',
			"es_CR": 'es',
			"es_PA": 'es',
			"es_DO": 'es',
			"es_MX": 'es',
			"es_VE": 'es',
			"es_CO": 'es',
			"es_PE": 'es',
			"es_EC": 'es',
			"es_CL": 'es',
			"es_UY": 'es',
			"es_PY": 'es',
			"es_BO": 'es',
			"es_SV": 'es',
			"es_HN": 'es',
			"es_NI": 'es',
			"es_PR": 'es',
		})
		// .preferredLanguage('gl')
		.determinePreferredLanguage()
		.useSanitizeValueStrategy('sanitizeParameters');
}]);
