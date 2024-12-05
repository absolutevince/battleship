export default function shipUi(length) {
  const container = document.createElement("div");
  container.className = "deployment_ship";
  for (let i = 0; i < length; i++) {
    const div = document.createElement("div");
    div.className = "block ship";
    container.append(div);
  }

  return container;
}
