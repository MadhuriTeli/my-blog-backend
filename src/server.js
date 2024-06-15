import express from "express";
const app = express();


const articleInfo = [
  {
    name: 'learn-react',
    upvotes: 0,
    comments: []
  }, {
    name: 'learn-node',
    upvotes: 0,
    comments: []
  }
];

app.use(express.json());

app.put('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params;
    const article = articleInfo.find(a => a.name === name);
    if (article) {
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes}!!`);
    } else {
        res.send("The Article doesn\'t exist")
    }
})


app.post("/api/articles/:name/comments", (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
  const article = articleInfo.find((a) => a.name === name);
  if (article) {
      article.comments.push({ postedBy, text });
    res.send(article.comments);
  } else {
    res.send("The Article doesn't exist");
  }
  
  
});

app.listen(8000, () => {
    console.log("Servern is listening on port 8000")
})