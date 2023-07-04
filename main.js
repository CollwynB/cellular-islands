const canvas = document.querySelector("#game-canvas");
if (canvas == null) throw new Error("could not find canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 1280, 720);

let terrain = [];
generateTerrain();

function generateTerrain() {
  for (let x = 0; x <= 256; x++) {
    terrain.push([]);
    for (let y = 0; y <= 256; y++) {
      if (x == 0 || y == 0 || x == 256 || y == 256) {
        terrain[x][y] = 0;
      } else {
        terrain[x][y] = Math.random() > 0.7 ? 15 : 0;
      }
    }
  }
  // iterate();
  // render();
}

function iterate() {
  iterations++;
  const newTerrain = [...terrain];
  for (let x = 1; x < 256; x++) {
    for (let y = 1; y < 256; y++) {
      let averageHeight = 0;
      let currentHeight = newTerrain[x][y];
      for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
          averageHeight += newTerrain[x - xOffset][y - yOffset];
        }
      }
      averageHeight -= currentHeight;
      averageHeight /= 8;

      if (averageHeight < 10) {
        newTerrain[x][y] =
          currentHeight + Math.random() * (averageHeight - currentHeight);
      } else if (averageHeight < currentHeight) {
        newTerrain[x][y] = currentHeight + Math.random() * 20 - 10;
      } else {
        newTerrain[x][y] = currentHeight + Math.random() * (averageHeight / 5);
      }
    }
  }
  terrain = newTerrain;
}

function render() {
  console.log("rendering");
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 1280, 720);

  for (let x = 0; x <= 256; x++) {
    for (let y = 0; y <= 256; y++) {
      ctx.fillStyle = getTerrain(terrain[x][y]);
      ctx.fillRect(x * 4, y * 4, 4, 4);
    }
  }
}

function getTerrain(height) {
  if (height < 20) return "blue";
  if (height < 50) return "yellow";
  if (height < 80) return "lime";
  // if (height < 150) return "darkolivegreen";
  // if (height < 180) return "grey";
  // return "white";
}

let interval = null;

let iterations = 0;

document.addEventListener("keypress", (e) => {
  console.log(e.key);
  if (e.key === " ") {
    iterate();
    console.log(iterations);
    render();
  }

  if (e.key === "Enter") {
    if (interval) {
      clearInterval(interval);
      console.log(iterations);
      return (interval = null);
    }
    interval = setInterval(() => {
      iterate();
      render();
    }, 1);
  }

  if (e.key == "r") {
    terrain.forEach((x) => {
      x.forEach((val) => {
        console.log(val);
      });
    });
  }
});
