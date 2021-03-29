import { useEffect, useRef, useState } from "react";

/**
 * Custom react hook to toggle between app palette themes
 */
export function useTheme() {
	const [theme, setTheme] = useState("dark");
	const isFirstRender = useRef(true);

	const toggleTheme = () => {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		localStorage.setItem("theme", theme);
	}, [theme]);

	useEffect(() => {
		const localTheme = localStorage.getItem("theme");
		if (localTheme) {
			setTheme(localTheme);
		}
	}, []);

	return {
		theme,
		toggleTheme,
	};
}
