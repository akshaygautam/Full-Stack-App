import axios from "axios";

export async function listBlobs() {
    try {
        const response = await axios.get("blob/list-files");
        return response.data;
    } catch (error) {
        console.error("Error fetching blob list:", error.message);
        throw error; // Re-throw the error to handle it at the component level if needed
    }
}