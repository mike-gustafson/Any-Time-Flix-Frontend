export const resultsProps = (resultsKey, routeType, length, query, toggleFilter, isFilterVisible) => {
    const defaultRoute = '/movies/movie/11'; // Default value

    // Define a map of custom routes based on different search values
    const customRoutes = {
        search: '/movies/search/' + query,
        nowPlaying: '/movies/now-playing',
        popular: '/movies/popular',
        topRated: '/movies/top-rated',
        upcoming: '/movies/upcoming'
    };

    const resultsLength = length || 20;
    const resultsRoute = customRoutes[routeType] || defaultRoute;

    return {
        key: resultsKey,
        resultsLength: resultsLength,
        resultsRoute: resultsRoute,
        toggleFilter: toggleFilter,
        isFilterVisible: isFilterVisible
    };
};
