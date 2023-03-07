export const httpGet = (url, onSuccess, onError) => {
	fetch(url)
	.then(response => response.json())
	.then(result => {
		if (result.error) {
			onError(result.error);
		}
		else {
			onSuccess(result);
		}
	});
};

export const httpPost = (url, data, onSuccess, onError) => {
	fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(data),
	})
	.then(response => response.json())
	.then(result => {
		if (result.error) {
			onError(result.error);
		}
		else {
			onSuccess(result);
		}
	});
};

export const httpPut = (url, data, onSuccess, onError) => {
	fetch(url, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
	.then(response => response.json())
	.then(result => {
		if (result.error) {
			onError(result.error);
		}
		else {
			onSuccess(result);
		}
	});
};

export const httpDelete = (url, onSuccess, onError) => {
	fetch(url, { method: "DELETE" })
	.then(response => response.json())
	.then(result => {
		if (result.error) {
			onError(result.error);
		}
		else {
			onSuccess(result);
		}
	});
};
