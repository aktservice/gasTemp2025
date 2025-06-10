import { CameraManager } from "./camera.ts";
import "./style.css";
const div = document.createElement("div");
div.id = "counter";
div.innerText = "div";
const temp = document.querySelector("#temp")!;
div.appendChild(temp);
document.querySelector("#app")?.appendChild(div);
