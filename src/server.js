import express from "express";
const app = express();
import 'dotenv/config';
import { db, connectToDB } from "./db.js";
app.use(express.json());




app.put('/api/articles/:name/upvote', async(req, res) => {
  const { name } = req.params;
  
  await db.collection('atricles').updateOne({ name }, {
    $inc: { upvotes: 1 },
  });

    //const article = articleInfo.find(a => a.name === name);
  const article = await db.collection('atricles').findOne({ name });
  
    if (article) {
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes}!!`);
    } else {
        res.send("The Article doesn\'t exist")
    }
})


app.post("/api/articles/:name/comments", async(req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
  
  await db.collection('atricles').updateOne({ name }, {
    $push: { comments: { postedBy, text } },
  });
  
  const article = await db.collection("atricles").findOne({ name });


  if (article) {
    res.send(article.comments);
  } else {
    res.send("The Article doesn't exist");
  }
});



connectToDB(() => {
  console.log("connected to db successfully");
  app.listen(8000, () => {
    console.log("Servern is listening on port 8000");
  });

});

