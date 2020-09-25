export interface ConfigDirInterface {
	/**
	 * The project root directory
	 */
	root: string;
	/**
	 * The project src directory
	 */
	src: string;
	/**
	 * The project dist directory
	 */
	dist: string;
	/**
	 * The project working directory depending if it is running on TS or JS.
	 * src/ for TS and dist/ for JS
	 */
	working: string;
}
