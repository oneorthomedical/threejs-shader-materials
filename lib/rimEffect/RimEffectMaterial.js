"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderPhongMaterial_1 = require("../ShaderPhongMaterial");
var RimEffectMaterial_frag_glsl_1 = __importDefault(require("./RimEffectMaterial.frag.glsl"));
var three_1 = require("three");
var three_2 = require("three");
var RimEffectMaterial = /** @class */ (function (_super) {
    __extends(RimEffectMaterial, _super);
    /**
     *
     * @param parameters
     */
    function RimEffectMaterial(parameters) {
        return _super.call(this, null, RimEffectMaterial_frag_glsl_1.default(), parameters) || this;
    }
    Object.defineProperty(RimEffectMaterial.prototype, "rimPow", {
        get: function () {
            return this.uniforms.rimPow.value;
        },
        set: function (value) {
            this.uniforms.rimPow.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RimEffectMaterial.prototype, "rimStrength", {
        get: function () {
            return this.uniforms.rimStrength.value;
        },
        set: function (value) {
            this.uniforms.rimStrength.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RimEffectMaterial.prototype, "rimColor", {
        get: function () {
            return this.uniforms.rimColor.value;
        },
        set: function (value) {
            this.uniforms.rimColor.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RimEffectMaterial.prototype, "insidePow", {
        get: function () {
            return this.uniforms.insidePow.value;
        },
        set: function (value) {
            this.uniforms.insidePow.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RimEffectMaterial.prototype, "insideStrength", {
        get: function () {
            return this.uniforms.insideStrength.value;
        },
        set: function (value) {
            this.uniforms.insideStrength.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RimEffectMaterial.prototype, "insideColor", {
        get: function () {
            return this.uniforms.insideColor.value;
        },
        set: function (value) {
            this.uniforms.insideColor.value = value;
        },
        enumerable: true,
        configurable: true
    });
    RimEffectMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            ShaderPhongMaterial_1.ShaderPhongMaterial.getBasicUniforms(),
            {
                rimColor: { value: new three_2.Color(1.0, 1.0, 1.0) },
                rimStrength: { value: 1.0 },
                rimPow: { value: 1.0 },
                insideColor: { value: new three_2.Color(0.0, 0.0, 0.0) },
                insideStrength: { value: 1.0 },
                insidePow: { value: 1.0 }
            }
        ]);
    };
    RimEffectMaterial.prototype.initDefines = function () {
        _super.prototype.initDefines.call(this);
        this.defines.USE_LIGHT = true;
        this.defines.USE_SURFACE_NORMAL = true;
    };
    return RimEffectMaterial;
}(ShaderPhongMaterial_1.ShaderPhongMaterial));
exports.RimEffectMaterial = RimEffectMaterial;