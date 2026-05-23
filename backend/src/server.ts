import express from 'express';
import countryRoutes from './v1/routes/country.routes';
import trafficRoutes from './v1/routes/traffic.routes';
import cors from "cors";

const app = express()
const port = 3000;


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json())

app.use("/countries", countryRoutes)
app.use("/traffic", trafficRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
  });
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });



