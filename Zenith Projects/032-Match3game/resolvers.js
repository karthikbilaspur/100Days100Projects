const resolvers = {
    Query: {
      game: () => {
        // Return game data
        return {
          id: 1,
          name: 'Game Name',
          description: 'Game Description'
        }
      }
    },
    Mutation: {
      makeMove: () => {
        // Update score and high score
        const score = 10
        const highScore = 100
  
        return {
          score,
          highScore
        }
      },
      login: (parent, { username, password }) => {
        // Authenticate user
        const user = { id: 1, username, password }
  
        // Generate JWT token
        const token = jwt.sign(user, 'secretkey')
  
        return { token }
      },
      createAccount: (parent, { username, password }) => {
        // Create new user
        const user = { id: 1, username, password }
  
        // Generate JWT token
        const token = jwt.sign(user, 'secretkey')
  
        return { token }
      }
    }
  }
  
  module.exports = resolvers