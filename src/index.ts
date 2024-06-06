import express, { Application, NextFunction, Request, Response } from 'express'

const HOST = process.env.HOST
const PORT = process.env.PORT

const app: Application = express()
app.use(express.json())

app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("ok")
})

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Not Found")
})

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
 
