export default function hoverBlock(block, blocks, currentShip) {
  if (!currentShip) return;
  block.addEventListener("mouseover", () => {
    const [y, x] = [+block.dataset.y, +block.dataset.x];
    let overflow = false;

    if (currentShip.orientation === "h") {
      if (x + currentShip.length > 8) overflow = true;

      for (let i = 0; i < currentShip.length; i++) {
        const target = blocks[y].childNodes[x + i];
        if (x + i > 7) return;

        if (overflow) {
          target.classList.add("deploy_hover", "error");
        } else {
          target.classList.add("deploy_hover");
        }
      }
    } else {
      if (y + currentShip.length > 8) overflow = true;

      for (let i = 0; i < currentShip.length; i++) {
        if (y + i > 7) return;
        const target = blocks[y + i].childNodes[x];
        if (overflow) {
          target.classList.add("deploy_hover", "error");
        } else {
          target.classList.add("deploy_hover");
        }
      }
    }
  });

  block.addEventListener("mouseout", (e) => {
    const [y, x] = [+e.target.dataset.y, +e.target.dataset.x];
    if (currentShip.orientation === "h") {
      for (let i = 0; i < currentShip.length; i++) {
        if (x + i > 7) {
          return;
        }
        const target = blocks[y].childNodes[x + i];
        target.classList.remove("deploy_hover", "error");
      }
    } else {
      for (let i = 0; i < currentShip.length; i++) {
        if (y + i > 7) {
          return;
        }
        const target = blocks[y + i].childNodes[x];
        target.classList.remove("deploy_hover", "error");
      }
    }
  });
}
