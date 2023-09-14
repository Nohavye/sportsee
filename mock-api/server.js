const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// Middleware personnalisé pour interdire l'accès à certaines routes
server.use((req, res, next) => {
    // Liste des routes interdites
    const forbiddenRoutes = ['/user', '/activity', '/average-sessions', '/performance']

    // Vérifie si la route de la requête est interdite
    if (forbiddenRoutes.includes(req.path)) {
        return res.status(404).json({ data: {} })
    }

    // Si la route n'est pas interdite, passe à la prochaine étape du middleware
    next()
})

// Middleware personnalisé pour encapsuler toutes les réponses JSON dans un objet 'data'
router.render = (req, res) => {
    const data = res.locals.data
    res.jsonp({ data: Array.isArray(data) ? data[0] : data })
}

server.use(middlewares)
server.use(router)

server.listen(3330, () => {
    console.log('JSON Server is running')
    console.log('')
    console.log('Possible endpoints:')
    console.log('')
    console.log('http://localhost:3330/user/:userId')
    console.log('http://localhost:3330/user/:userId/activity')
    console.log('http://localhost:3330/user/:userId/average-sessions')
    console.log('http://localhost:3330/user/:userId/performance')
    console.log('')
    console.log(
        'Currently only two users have been mocked. They have userId 12 and 18 respectively.'
    )
})
