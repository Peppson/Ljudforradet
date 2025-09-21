export function useApi() {

  const postFetch = async (url: string, data: any) => { // any ;)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response;
    }
    catch (error) {
      console.error("Fetch error: ", error);
      return null;
    }
  };

  const getFetch = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    }
    catch (error) {
      console.error("Fetch error: ", error);
      return null;
    }
  };

  const putFetch = async (url: string, data: any) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response;
    }
    catch (error) {
      console.error("Fetch error: ", error);
      return null;
    }
  };

  const deleteFetch = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    }
    catch (error) {
      console.error("Fetch error: ", error);
      return null;
    }
  };

  return { postFetch, getFetch, putFetch, deleteFetch };
}
