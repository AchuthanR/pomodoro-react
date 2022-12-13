import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = (props) => {
	let elementRef = useRef(null);
	if (!elementRef.current) {
		elementRef.current = document.createElement("div");
	}

	useEffect(() => {
		let modalRoot = document.getElementById("modal");
		modalRoot.appendChild(elementRef.current);

		return () => modalRoot.removeChild(elementRef.current);
	}, []);

	return createPortal(<>{props.children}</>, elementRef.current);
};

export default Modal;
