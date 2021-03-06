import { Color, Matrix3, ShaderMaterial, ShaderMaterialParameters, Texture, Vector2 } from "three";
export declare abstract class ShaderSpriteMaterial extends ShaderMaterial {
    /**
     * コンストラクタ。
     * @param vertexShader
     * @param fragmentShader
     * @param parameters
     */
    constructor(vertexShader: string, fragmentShader: string, parameters?: ShaderMaterialParameters);
    /**
     * ShaderChunkにこのマテリアルに必要なChunkを追加する。
     */
    protected initChunks(): void;
    /**
     * uniformsを初期化する。
     */
    protected initUniforms(): void;
    /**
     * definesを初期化する。
     */
    protected initDefines(): void;
    /**
     * 1.オプションで指定されなかったパラメーター値を補完する。
     * 2.uniformsに代入する必要のあるパラメーターを明示的に代入する。
     *
     * @param parameters
     */
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
    /**
     * 透明度
     * @deprecated Use uniformOpacity, To be removed in version 0.3.0
     * @see https://github.com/microsoft/TypeScript/pull/37894
     */
    get uniformOpacity(): number;
    /**
     * 透明度
     * @deprecated Use uniformOpacity, To be removed in version 0.3.0
     * @param value
     */
    set uniformOpacity(value: number);
    protected _opacity: number;
    /**
     * Spriteマテリアルと互換性を持つために、colorプロパティはdiffuseへ代入される。
     */
    get color(): Color;
    set color(value: Color);
    get center(): Vector2;
    set center(value: Vector2);
    get rotation(): number;
    set rotation(value: number);
    get uvTransform(): Matrix3;
    set uvTransform(value: Matrix3);
    get map(): Texture;
    set map(value: Texture);
}
//# sourceMappingURL=ShaderSpriteMaterial.d.ts.map
