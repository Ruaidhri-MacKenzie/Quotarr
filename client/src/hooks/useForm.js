import { useState } from "react";

const useForm = (onSubmit) => {
	const [state, setState] = useState({});

	const handleInputChange = (event) => {
		setState((current) => ({ ...current, [event.target.name]: event.target.value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit();
	};
	
	return [state, handleInputChange, handleSubmit];
};

export default useForm;
