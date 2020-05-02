"use strict";
/**
 * 十字のラインでグリッドを分割するシェーダー
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () {
    // language=GLSL
    return "\n#define PHONG\n\n#include <mesh_phong_uniform>\nvarying vec2 uvPosition;\n#include <mesh_position_varying>\n\n//user settings\n#include <time_animation_uniform_chunk>\n#include <wavy_animation_uniform_chunk>\n#include <repeat_pattern_uniform_chunk>\n#include <mask_map_uniform_chunk>\n#include <reversible_uniform_chunk>\nuniform float gridWeight;\nuniform float radius;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_uniform_chunk>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n    #include <clipping_planes_fragment>\n    #include <mesh_phong_diffuse_color>\n    #include <logdepthbuf_fragment>\n    \n    #include <map_fragment_begin_chunk>\n    #include <map_fragment_chunk>\n    #include <color_fragment>\n\n    #include <repeat_pattern_fragment_chunk>    \n    vec2 localPos = mod(uv, 1.0) - 0.5;\n    vec2 id = uv - localPos;\n    #include <wavy_animation_fragment_chunk>\n\n    #include <mask_map_fragment_chunk>\n    float w = gridWeight;\n    w = clamp( w, 0.0, 1.0);\n    \n    float margin = clamp ( w * 0.33, 0.00, 0.05 );\n    \n    //\u5341\u5B57\u3092\u63CF\u753B\n    float gridLine;\n    gridLine  = smoothstep ( -w-margin, -w, localPos.x );\n    gridLine -= smoothstep ( w, w+margin, localPos.x );\n    gridLine += smoothstep ( -w-margin, -w, localPos.y );\n    gridLine -= smoothstep ( w, w+margin, localPos.y );\n    gridLine  = clamp( gridLine, 0.0, 1.0 ); \n\n    //\u534A\u5F84\u3067\u30DE\u30B9\u30AF\n    float r = radius - (1.0-mask);\n    gridLine -= smoothstep( r, r+margin, localPos.x);\n    gridLine -= smoothstep( -r, -r-margin, localPos.x);\n    gridLine -= smoothstep( r, r+margin, localPos.y);\n    gridLine -= smoothstep( -r, -r-margin, localPos.y);\n    gridLine = clamp( gridLine, 0.0, 1.0 );\n    \n    gridLine = isReversed\n        ? 1.0 - gridLine\n        : gridLine;\n    diffuseColor.a *= gridLine;\n\n    #include <mesh_phong_switching_alpha_map>\n    #include <alphatest_fragment>\n    #include <specularmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <emissivemap_fragment>\n    // accumulation\n    #include <lights_phong_fragment>\n    #include <lights_fragment_begin>\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n    // modulation\n    #include <aomap_fragment>\n    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n    #include <envmap_fragment>\n    gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n}\n";
});