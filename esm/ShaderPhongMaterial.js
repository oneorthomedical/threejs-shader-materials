import { ShaderMaterial, Color, AdditiveBlending, UniformsUtils, UniformsLib } from "three";
import { MeshPhongChunk } from "./chunk/MeshPhongChunk";
import { SurfaceNormalChunk } from "./chunk/SurfaceNormalChunk";
import { ExpansionChunk } from "./chunk/ExpansionChunk";
import { MapChunk } from "./chunk/MapChunk";
import VertexShader from "./ShaderPhongMaterial.vert.glsl";
import FragmentShader from "./ShaderPhongMaterial.frag.glsl";
/**
 * MeshPhongMaterialに準じるShaderMaterialクラス。
 *
 * @see https://github.com/mrdoob/three.js/blob/76c64b23d422dcfb36a28353f45b1effa1f68c5a/src/renderers/shaders/ShaderLib.js#L53
 */
export class ShaderPhongMaterial extends ShaderMaterial {
    /**
     * コンストラクタ。
     * @param vertexShader
     * @param fragmentShader
     * @param parameters
     */
    constructor(vertexShader, fragmentShader, parameters) {
        super(parameters);
        if (parameters == null)
            parameters = {};
        if (vertexShader == null) {
            vertexShader = VertexShader();
        }
        if (fragmentShader == null) {
            fragmentShader = FragmentShader();
        }
        this.initChunks();
        this.initUniforms();
        this.initDefines();
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.initDefaultSetting(parameters);
    }
    /**
     * このMaterialに必要なuniformsを生成する。
     */
    static getBasicUniforms() {
        return UniformsUtils.merge([
            UniformsLib.common,
            UniformsLib.specularmap,
            UniformsLib.envmap,
            UniformsLib.aomap,
            UniformsLib.lightmap,
            UniformsLib.emissivemap,
            UniformsLib.bumpmap,
            UniformsLib.normalmap,
            UniformsLib.displacementmap,
            UniformsLib.gradientmap,
            UniformsLib.fog,
            UniformsLib.lights,
            {
                emissive: { value: new Color(0x000000) },
                specular: { value: new Color(0x111111) },
                shininess: { value: 30 },
                hasAlphaMap: { value: false }
            },
            SurfaceNormalChunk.getUniform(),
            ExpansionChunk.getUniform(),
            MapChunk.getUniform()
        ]);
    }
    /**
     * ShaderChunkにこのマテリアルに必要なChunkを追加する。
     */
    initChunks() {
        MeshPhongChunk.registerChunk();
        SurfaceNormalChunk.registerChunk();
        ExpansionChunk.registerChunk();
        MapChunk.registerChunk();
    }
    /**
     * uniformsを初期化する。
     */
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            ExpansionChunk.getUniform(),
            {}
        ]);
    }
    /**
     * definesを初期化する。
     */
    initDefines() {
        this.defines = Object.assign({}, MeshPhongChunk.getDefines(), SurfaceNormalChunk.getDefines(), ExpansionChunk.getDefines(), this.defines);
    }
    /**
     * 1.オプションで指定されなかったパラメーター値を補完する。
     * 2.uniformsに代入する必要のあるパラメーターを明示的に代入する。
     *
     * @param parameters
     */
    initDefaultSetting(parameters) {
        this.opacity = this._opacity;
        this.lights = true; //FIXME シェーダーがエラーを起こすのでlights設定は強制でON
    }
    /**
     * MeshPhongマテリアルと互換性を持つために、colorプロパティはdiffuseへ代入される。
     */
    get color() {
        return this.uniforms.diffuse.value;
    }
    set color(value) {
        this.uniforms.diffuse.value = value;
    }
    /**
     * 透明度
     */
    get opacity() {
        return this._opacity;
    }
    /**
     * opacityは基底クラスのMaterialのコンストラクタ内で明示的に1.0が代入される。
     * この段階でuniformsはundefinedなので、そのままでは初期化できない。
     * このsetterでは受け取った値をprivate変数に保存して、初期化後にuniformsに再代入する。
     * @param value
     */
    set opacity(value) {
        this._opacity = value;
        if (this.uniforms && this.uniforms.opacity) {
            this.uniforms.opacity.value = value;
        }
    }
    get emissive() {
        return this.uniforms.emissive.value;
    }
    set emissive(value) {
        this.uniforms.emissive.value = value;
    }
    get map() {
        return MapChunk.getMap(this);
    }
    set map(val) {
        MapChunk.setMap(this, val);
        this.onSetMap(val);
    }
    onSetMap(val) { }
    get alphaMap() {
        return this.uniforms.alphaMap.value;
    }
    set alphaMap(value) {
        this.uniforms.alphaMap.value = value;
        this.uniforms.hasAlphaMap.value = value != null;
        this.onSetAlphaMap(value);
    }
    onSetAlphaMap(value) { }
    /**
     * 発光状態のために、マテリアルの設定をまとめて変更する。
     * {@link https://stackoverflow.com/questions/37647853/three-js-depthwrite-vs-depthtest-for-transparent-canvas-texture-map-on-three-p}
     */
    startGlow() {
        this.alphaTest = 0.0;
        this.depthWrite = false;
        this.blending = AdditiveBlending;
    }
}