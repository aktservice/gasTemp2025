import { setupCounter } from "./counter.ts";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="vite">
   <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

document.querySelector("#counter")?.classList.add("hover:bg-yellow-500");
document.querySelector("#vite")?.classList.add("hover:bg-yellow-500");
setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
