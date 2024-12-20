const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentRouter = require("./Router/student.router");
const cors = require("cors");
const Razorpay = require("razorpay");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("files"));

// ================================================== //

app.use("/api/student", studentRouter);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/orders", async (req, res) => {
  console.log("req :", req.body);
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    return res.status(400).json({ error: "Amount and currency are required" });
  }

  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  if (typeof currency !== "string") {
    return res.status(400).json({ error: "Invalid currency" });
  }

  const razorpay = new Razorpay({
    key_id: "rzp_live_ojIqx1hLEKLYmC",
    key_secret: "IkxC4UgUAViKiOFbokdbuLUf",
  });
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "receipt#1",
    payment_capture: 1,
  };
  razorpay.orders
    .create(options)
    .then((response) => {
      console.log("Order created:", response);
      res.json({
        order_id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    })
    .catch((error) => {
      console.error("Razorpay API error:", error);
    });
});

app.get("/payment/:paymentId", async (req, res) => {
  const { paymentId } = req.params;
  const razorpay = new Razorpay({
    key_id: "rzp_live_ojIqx1hLEKLYmC",
    key_secret: "IkxC4UgUAViKiOFbokdbuLUf",
  });
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    if (!payment) {
      return res.status(500).json("Error at razorpay loading");
    }
    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    res.status(500).json("failed to fetch");
  }
});

app.listen(3050, () => {
  console.log("Port No. 3050");
});

// mongoose.connect('mongodb://127.0.0.1:27017/Backend').then(res => {
//     console.log('DB connected');
// });

mongoose
  .connect(
    "mongodb+srv://ijajjaman29:4W5tm5HAZiMKQUio@studentdata.mfu5i.mongodb.net/StudentData?retryWrites=true&w=majority&tls=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,
      tlsAllowInvalidCertificates: true,
    }
  )
  .then((res) => {
    console.log("DB connected");
  });
