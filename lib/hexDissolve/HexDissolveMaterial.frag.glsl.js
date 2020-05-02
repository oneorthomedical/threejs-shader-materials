"use strict";
/**
 * 6角形グリッドでディゾルブを行うフラグメントシェーダー
 * {@link https://qiita.com/edo_m18/items/37d8773a5295bc6aba3d}
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () {
    // language=GLSL
    return "\n#define PHONG\n\n#include <mesh_phong_uniform>\nvarying vec2 uvPosition;\n#include <mesh_position_varying>\n\n//user settings\n#include <repeat_pattern_uniform_chunk>\n#include <mask_map_uniform_chunk>\n#include <reversible_uniform_chunk>\nuniform float progress;\nuniform float delay;\nuniform float gridWeight;\nuniform bool isAscending;\n\nuniform vec3 gridEmissive;\nuniform float gridEmissiveWeight;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_uniform_chunk>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n#include <hex_grid_function_chunk>\n\nfloat reverse( float val, bool isReversed){\n  return isReversed ? 1.0 - val : val;\n}\n\nvoid main() {\n    #include <clipping_planes_fragment>\n    #include <mesh_phong_diffuse_color>\n    #include <logdepthbuf_fragment>\n    \n    #include <map_fragment_begin_chunk>\n    #include <map_fragment_chunk>\n    #include <color_fragment>\n\n    #include <repeat_pattern_fragment_chunk>    \n    vec4 hc = hexCoords( uv );\n    vec2 id = hc.zw;\n\n    #include <mask_map_fragment_chunk>\n  \n    float range = 1.0 - delay;\n    float rateY = isAscending \n      ? ( division-id.y ) / division\n      : id.y  / division;\n  \n    float currentProgress = progress - (rateY * delay);\n    currentProgress /= range;\n    currentProgress = clamp( currentProgress, 0.0, 1.0);\n  \n    float w = gridWeight + currentProgress / 2.0 + (1.0 - mask);\n    w = clamp( w, 0.0, 1.0);\n    float margin = clamp ( w * 0.33, 0.00, 0.02 );\n  \n    float gridLine = smoothstep(w, w + margin, hc.y);\n    gridLine =  reverse ( gridLine , isReversed);\n    diffuseColor.a *= gridLine ;\n    \n    float emmesiveWeight = currentProgress / 2.0 * gridEmissiveWeight;\n    emmesiveWeight =  reverse ( emmesiveWeight, isReversed );\n    float emissiveVal = smoothstep(emmesiveWeight, emmesiveWeight + margin, hc.y);\n    emissiveVal = 1.0 - emissiveVal;\n    diffuseColor.rgb += gridEmissive * emissiveVal;\n\n    #include <mesh_phong_switching_alpha_map>\n    #include <alphatest_fragment>\n    #include <specularmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <emissivemap_fragment>\n    // accumulation\n    #include <lights_phong_fragment>\n    #include <lights_fragment_begin>\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n    // modulation\n    #include <aomap_fragment>\n    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n    #include <envmap_fragment>\n    gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n}\n";
});