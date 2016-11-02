'use strict';

app.factory('ReferentialDataService', [ function() {
	return {
		getAllPets : function() {
			var allPets = [ {
				'code' : 'BIRD',
				'name' : 'Birds'
			}, {
				'code' : 'CAT',
				'name' : 'Cats'
			}, {
				'code' : 'DOG',
				'name' : 'Dogs'
			} ];
			return allPets;
		}
	}
} ]);
