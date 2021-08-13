export function medianCut<T extends number[]>(data: T[], count = 16) {
	let clusters = [data];
	while (clusters.length < count) {
		clusters = clusters.flatMap((cluster) => {
			const ranges = cluster
				.reduce(
					(ranges, point) =>
						ranges.map(([min, max], index) => [
							Math.min(min, point[index]),
							Math.max(max, point[index]),
						]),
					cluster[0].map((value) => [value, value])
				)
				.map(([min, max]) => max - min);
			const sortByIndex = ranges.indexOf(Math.max(...ranges));
			const sortedData = [...cluster].sort((a, b) =>
				a[sortByIndex] > b[sortByIndex] ? -1 : 1
			);
			const middleIndex = Math.round(sortedData.length / 2);
			return [
				sortedData.slice(0, middleIndex),
				sortedData.slice(middleIndex, sortedData.length),
			];
		});
	}
	return clusters;
}