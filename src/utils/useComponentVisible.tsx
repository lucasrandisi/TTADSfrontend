import { useEffect, useRef, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useComponentVisible(initialIsVisible) {
	const [isComponentVisible, setIsComponentVisible] = useState<boolean>(initialIsVisible);
	const ref = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = event => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsComponentVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	});

	return { ref, isComponentVisible, setIsComponentVisible };
}
