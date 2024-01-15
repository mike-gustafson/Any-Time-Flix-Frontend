import axios from 'axios';

const getPopularSearches = async () => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/searches/top25`
        );
        return response.data.response;
    } catch (error) {
        console.error("Error fetching popular searches:", error);
    }
}

module.exports = getPopularSearches;
