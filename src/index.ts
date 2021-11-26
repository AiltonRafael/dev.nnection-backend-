import app from './app/'
import 'dotenv/config'

const PORT = process.env.PORT || process.env.LOCAL_PORT || 3333

app.listen(PORT, () => {
  console.log(`Running on server ${PORT}`)
})
