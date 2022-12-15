const app = require('../src/app')
const port = process.env.PORT 

app.listen(port, () => {
  console.log(`A aplicação está rodando na porta ${port}`)
});