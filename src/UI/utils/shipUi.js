export default function shipUi(ship) {
  const container = document.createElement("div");
  if (ship) {
    container.className = "deployment_ship";
    for (let i = 0; i < ship.length; i++) {
      const div = document.createElement("div");
      div.className = "block ship";
      container.append(div);
    }
  }

  return container;
}
