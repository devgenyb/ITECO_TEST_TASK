export const wordCountEnding = (count: number, word: string): string => {
	if (count === 0 || count === 1) {
		return word;
	} else if (count < 5) {
		return word + "a";
	} else {
		return word + "ов";
	}
};

export const separateNumbers = (number: number): string  => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
