import app from "./app";

function init() {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log("Server Listening on port " + port);
    });
  } catch (err) {
    console.log(err);
  }
}

init();

export default app;
