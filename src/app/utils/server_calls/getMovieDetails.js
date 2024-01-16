import axios from "axios";

const getMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/movies/movie/${movieId}`
        );
        console.log("Movie details:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
};

export default getMovieDetails;