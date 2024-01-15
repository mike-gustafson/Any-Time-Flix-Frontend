import axios from "axios";

const getPopularMovies = async (numberOfPages, startingPage) => {
    try {
        let page = startingPage ? startingPage : 1;
        let pagesRequested = numberOfPages ? numberOfPages : 1;
        let dataToReturn;

        for (let i = 0; i < pagesRequested; i++) {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/movies/popular/${page}`
        );
        if (i === 0) {
            dataToReturn = response.data.results;
        } else {
            dataToReturn = dataToReturn.concat(response.data.results);
        }
        page++;
    }
    return dataToReturn;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
    }
};

export default getPopularMovies;
