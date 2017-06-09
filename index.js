let express = require('express')
let app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000')
})
