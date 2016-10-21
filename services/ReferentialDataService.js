app.factory('ReferentialDataService', [ function() {
	return {
		getAllPets : function() {
			var allPets = [ 'Birds', 'Cats', 'Chickens', 'Cows', 'Dogs', 'Donkey',
					'Ducks', 'Fish', 'Goats', 'Hamsters', 'Horses', 'Lizards',
					'Mice', 'Pigs', 'Pigeons', 'Rabbits', 'Rats', 'Sheep',
					'Snakes', 'Turkeys', 'Turtles' ];
			
			return allPets;
		}
	}
} ]);
