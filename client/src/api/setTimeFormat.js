const setTimeformat = (givenTime) => {
	const updatedTime = new Date(givenTime).getTime();

	const currentTime = new Date().getTime();
	const timeDifference = currentTime - updatedTime;
	const minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Convert milliseconds to minutes  if (minutesDifference < 60) {   console.log(${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago); }

	const millisecondsInHour = 3600000;
	const millisecondsInDay = 86400000;

	let formatedDate;
	if (minutesDifference < 60) {
		formatedDate = `${minutesDifference} ${
			minutesDifference === 1 ? 'minute' : 'minutes'
		} ago`;
	} else if (timeDifference < millisecondsInHour * 24) {
		// Less than 24 hours ago
		const hoursAgo = Math.floor(timeDifference / millisecondsInHour);
		console.log(`${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`);
		// return hoursAgo;
		formatedDate = `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
	} else if (timeDifference < millisecondsInDay * 7) {
		// Less than 7 days ago
		const daysAgo = Math.floor(timeDifference / millisecondsInDay);
		formatedDate = `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
	} else {
		// More than 7 days ago
		formatedDate = new Date(givenTime).toLocaleDateString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			day: 'numeric',
			month: 'long',
		});
	}

	return formatedDate;
};

export { setTimeformat };
