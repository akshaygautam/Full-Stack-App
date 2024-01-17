// BaseService.js
export const fetchData = async (tableId) => {
    try {
        const response = await fetch(`/akshaygautam/tableOf/${tableId}`);
        // const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${tableId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
