// Fisher-Yates shuffle algorithm adopted from 'https://javascript.info/task/shuffle'
export const arrayShuffle = (array: any[]) => {
	let arrayCopy = [...array];
	for (let i = arrayCopy.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

		// swap elements array[i] and array[j]
		// we use "destructuring assignment" syntax to achieve that
		// you'll find more details about that syntax in later chapters
		// same can be written as:
		// let t = array[i]; array[i] = array[j]; array[j] = t
		[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
	}
	return arrayCopy;
};
