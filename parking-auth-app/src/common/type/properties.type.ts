export type Properties<T> = {
	[P in keyof T]: T[P];
};
