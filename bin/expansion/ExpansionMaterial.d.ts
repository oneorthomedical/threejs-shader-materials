import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ShaderMaterialParameters } from "three";
import { IExpandable } from "../chunk/ExpansionChunk";
export declare class ExpansionMaterial extends ShaderPhongMaterial implements IExpandable {
    expansionStrength: number;
    constructor(parameters?: ShaderMaterialParameters);
    protected initDefines(): void;
}
//# sourceMappingURL=ExpansionMaterial.d.ts.map