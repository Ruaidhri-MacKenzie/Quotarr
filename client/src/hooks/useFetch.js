import { useState } from "react";

const useFetch = (url, method = "GET", body = {}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			})
        .then(response => response.json())
        .then(json => {
          if (!ignore) setData(json);
        });
			return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
};

export default useFetch;
