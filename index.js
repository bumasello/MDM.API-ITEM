import express from "express";
import mdmRouter from "./router/mdmRouter.js";
import cron from "node-cron";
import mdmRepository from "./repository/mdmRepository.js";

const app = express();

app.use(express.json());
app.use("/mdm", mdmRouter);
app.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

cron.schedule("0 0 * * *", meiaNoiteEvento);

function meiaNoiteEvento() {
  mdmRepository.recupDataPac();
  mdmRepository.populaBipPac();
  mdmRepository.geraInvalidoPac();
  mdmRepository.geraBupPac();
  mdmRepository.reproStatusPac();

  console.log("20:50");
}

app.listen(3000, () => console.log("API Started"));
