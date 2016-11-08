app.filter('millSecondsToDateString', function() {
	return function(millseconds) {
		var dateString = new Date(millseconds);
		return dateString.toLocaleDateString();
	};
});