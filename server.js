require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const commentRoute = require("./routes/commentRoutes");
const config = require("./config");
const categories = require("./categories");
const posts = require("./posts");
const comments = require("./comments");

const app = express();

// Connect to database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./frontend/build")));
app.use(cors());

app.use((req, res, next) => {
  const token = req.get("Authorization");

  if (token) {
    req.token = token;
    next();
  } else {
    res.status(403).send({
      error:
        "Please provide an Authorization header to identify yourself (can be whatever you want)",
    });
  }
});

app.use("/", userRoute);
app.use("/", postRoute);
app.use("/", commentRoute);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/categories", (req, res) => {
  categories.getAll(req.token).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.get("/:category/posts", (req, res) => {
  posts.getByCategory(req.token, req.params.category).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.get("/posts", (req, res) => {
  posts.getAll(req.token).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.post("/posts", (req, res) => {
  posts.add(req.token, req.body).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.get("/posts/:id", (req, res) => {
  posts.get(req.token, req.params.id).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.delete("/posts/:id", (req, res) => {
  console.log(req.params.id);
  posts
    .disable(req.token, req.params.id)
    .then((post) => comments.disableByParent(req.token, post))
    .then(
      (data) => res.send(data),
      (error) => {
        console.error(error);
        res.status(500).send({
          error: "There was an error.",
        });
      }
    );
});

app.post("/posts/:id", (req, res) => {
  const { option } = req.body;
  const id = req.params.id;
  posts.vote(req.token, id, option).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.put("/posts/:id", (req, res) => {
  posts.edit(req.token, req.params.id, req.body).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.get("/posts/:id/comments", (req, res) => {
  comments.getByParent(req.token, req.params.id).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.get("/comments/:id", (req, res) => {
  comments.get(req.token, req.params.id).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.put("/comments/:id", (req, res) => {
  comments.edit(req.token, req.params.id, req.body).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.post("/comments", (req, res) => {
  comments.add(req.token, req.body).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.post("/comments/:id", (req, res) => {
  const { option } = req.body;
  comments.vote(req.token, req.params.id, option).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.delete("/comments/:id", (req, res) => {
  comments.disable(req.token, req.params.id).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

if (process.env.Node_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
  });
}

app.listen(config.port, () => {
  console.log("Server listening on port %s, Ctrl+C to stop", config.port);
});
