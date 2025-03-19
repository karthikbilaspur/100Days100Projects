<template>
  <div id="app">
    <h1>Game Title</h1>
    <router-view />
    <button @click="makeMove">Make Move</button>
    <p>Score: {{ score }}</p>
    <p>High Score: {{ highScore }}</p>
    <button @click="login">Login</button>
    <button @click="createAccount">Create Account</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: 0,
      highScore: 0
    }
  },
  methods: {
    makeMove() {
      axios.post('/graphql', {
        query: `
          mutation MakeMove {
            makeMove {
              score
              highScore
            }
          }
        `
      })
      .then(response => {
        this.score = response.data.data.makeMove.score
        this.highScore = response.data.data.makeMove.highScore
      })
      .catch(error => {
        console.error(error)
      })
    },
    login() {
      axios.post('/graphql', {
        query: `
          mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              token
            }
          }
        `,
        variables: {
          username: 'username',
          password: 'password'
        }
      })
      .then(response => {
        console.log(response.data.data.login.token)
      })
      .catch(error => {
        console.error(error)
      })
    },
    createAccount() {
      axios.post('/graphql', {
        query: `
          mutation CreateAccount($username: String!, $password: String!) {
            createAccount(username: $username, password: $password) {
              token
            }
          }
        `,
        variables: {
          username: 'username',
          password: 'password'
        }
      })
      .then(response => {
        console.log(response.data.data.createAccount.token)
      })
      .catch(error => {
        console.error(error)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>