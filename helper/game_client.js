let gameContext = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 1000
    this.canvas.height = 500
    this.context = this.canvas.getContext("2d")
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
  }
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

let connection = new WebSocket("ws://127.0.0.1:8080")
connection.onmessage = (e) => {
  let state = JSON.parse(e.data)

  // clear prev render
  gameContext.clear()
  // re-render w/ new state
  for (let i = 0; i < state.length; i++) {
    let e = state[i]
    console.log(e.position)
    ctx = gameContext.context;
    ctx.fillStyle = "red";
    ctx.fillRect(e.position.x, e.position.y, 100, 100);
  }
}

document.addEventListener('keydown', function(event) {
  if (event.keyCode == 37)
    connection.send("left")
  else if (event.keyCode == 39)
    connection.send("right");
  else if (event.keyCode == 38)
    connection.send("up");
  else if (event.keyCode == 40)
    connection.send("down");
})
