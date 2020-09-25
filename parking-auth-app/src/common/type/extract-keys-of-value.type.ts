export type ExtractKeysOfValueType<T, K> = {
	[I in keyof T]: T[I] extends K ? I : never;
}[keyof T];
