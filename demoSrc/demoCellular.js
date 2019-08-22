import { Common } from "./Common";
import * as dat from "dat.gui";
import {
  Color,
  Fog,
  Mesh,
  PointLight,
  PointLightHelper,
  SphereGeometry
} from "three";
import { CellularNoiseMaterial } from "../bin/";
import { CommonGUI } from "./CommonGUI";

export class Study {
  constructor() {
    const W = 640;
    const H = 480;

    const scene = Common.initScene();
    scene.fog = new Fog(0x000000, 80, 160);
    Common.initLight(scene);
    const camera = Common.initCamera(scene, W, H);
    const renderer = Common.initRenderer(W, H);
    const control = Common.initControl(camera, renderer);
    Common.initHelper(scene);
    const mat = this.initObject(scene);
    Common.render(control, renderer, scene, camera, () => {
      mat.addTime(0.016);
    });

    this.initGUI(mat);
  }

  initObject(scene) {
    const spot = new PointLight(0xffffff, 1, 0, 2);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const seg = 32;
    const geo = new SphereGeometry(30, seg, seg);

    const mat = new CellularNoiseMaterial({
      fog: scene.fog !== undefined
    });
    mat.color = new Color(0x0055ff);
    mat.transparent = true;
    mat.tiles = 1;
    mat.grid = 8;
    mat.speed = 2.0;
    mat.divisionScaleX = 2.0;
    const mesh = new Mesh(geo, mat);

    scene.add(mesh);

    return mat;
  }

  initGUI(mat) {
    const gui = new dat.GUI();
    CommonGUI.initMaterialGUI(gui, mat);
    CommonGUI.initAnimationGUI(gui, mat);
    this.initGUIMaterial(gui, mat);
  }

  initGUIMaterial(gui, mat) {
    const folder = gui.addFolder("CellularNoise");

    folder.add(mat, "grid", 3.0, 64.0).step(1.0);
    folder.add(mat, "tiles", 1.0, 8.0).step(1.0);
    folder.add(mat, "divisionScaleX", 1.0, 4.0).step(1.0);
    folder.open();
  }
}

window.onload = () => {
  const study = new Study();
};