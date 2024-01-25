export const reduceObjectByKeys = (obj, keys) =>
	Object.entries(obj).reduce((acc, [key, value]) => {
		if (keys.includes(key)) acc[key] = value;
		return acc;
	}, {});
