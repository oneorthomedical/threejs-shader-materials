/**
 * 渦巻き状にUV座標を変形させるシェーダー
 */
export default () => {
  // language=GLSL
  return `
#define PHONG

#include <mesh_phong_uniform>
varying vec2 uvPosition;
#include <mesh_position_varying>

#include <time_animation_uniform_chunk>
uniform float uvRotation;
uniform float swirlRotation;
uniform float radius;
uniform vec2 center;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_uniform_chunk>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

/**
 * UV座標を回転する
 */
vec2 rotateUV(vec2 uv, float rotation, vec2 center)
{
  return vec2(
    cos(rotation) * (uv.x - center.x) + sin(rotation) * (uv.y - center.y) + center.x,
    cos(rotation) * (uv.y - center.y) - sin(rotation) * (uv.x - center.x) + center.y
  );
}

/**
 * UV座標をツイストする
 */
vec2 swirl(vec2 uv, float radius, float rotation, vec2 center)
{
  vec2 tc = uv - center;
  float dist = length(tc);
  if (dist < radius) 
  {
    float percent = (radius - dist) / radius;
    float theta = percent * percent * rotation;
    float s = sin(theta);
    float c = cos(theta);
    tc = vec2(dot(tc, vec2(c, -s)), dot(tc, vec2(s, c)));
  }
  tc += center;
  return tc;
}

void main() {
    #include <clipping_planes_fragment>
    #include <mesh_phong_diffuse_color>
    #include <logdepthbuf_fragment>
    
    #include <map_fragment_begin_chunk>
    mapUV = rotateUV( mapUV, uvRotation , center);
    mapUV = swirl( mapUV, radius, swirlRotation, center );
    // offset Texture 
    mapUV += vec2(time);
    #include <map_fragment_chunk>
    
    #include <color_fragment>
    #include <mesh_phong_switching_alpha_map>
    #include <alphatest_fragment>
    #include <specularmap_fragment>
    #include <normal_fragment_begin>
    #include <normal_fragment_maps>
    #include <emissivemap_fragment>
    // accumulation
    #include <lights_phong_fragment>
    #include <lights_fragment_begin>
    #include <lights_fragment_maps>
    #include <lights_fragment_end>
    // modulation
    #include <aomap_fragment>
    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
    #include <envmap_fragment>
    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>
    #include <dithering_fragment>
}`;
};
