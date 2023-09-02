const apiUrl = 'http://localhost:3000'

export const apiRoutes = (userId, key = 'data') => {
    return {
        user: {
            url: apiUrl,
            route: `/user/${userId}`,
            key: key,
        },
        activity: {
            url: apiUrl,
            route: `/user/${userId}/activity`,
            key: key,
        },
        averageSessions: {
            url: apiUrl,
            route: `/user/${userId}/average-sessions`,
            key: key,
        },
        performance: {
            url: apiUrl,
            route: `/user/${userId}/performance`,
            key: key,
        },
    }
}

export default apiRoutes
