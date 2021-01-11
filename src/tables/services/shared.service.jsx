export function groupBy(arrayToGroup, key) {
	return arrayToGroup.reduce((accumulator, currentValue) => {
		accumulator[currentValue[key]] = accumulator[currentValue[key]] || [];

		accumulator[currentValue[key]].push(currentValue);

		return accumulator;
	}, {});
}
