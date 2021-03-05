import { useState } from "react";

import { dark, light } from "./theme";

/**
 * Custom react hook to toggle between app palette themes
 */
export function useTheme() {
	const [theme, setTheme] = useState(dark);

	const toggleTheme = () => {
		if (theme === dark) {
			setTheme(light);
		} else {
			setTheme(dark);
		}
	};

	/* Local storage
	  useEffect(() => {
		const localTheme = localStorage.getItem('theme')
		if (localTheme) {
		  setTheme(localTheme)
		}
	  }, [])
	  */

	return {
		theme,
		toggleTheme,
	};
}
