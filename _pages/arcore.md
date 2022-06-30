---
title: "ARCore, sceneform"
permalink: /arcore/
layout: single
---
# 최소사양   
Android SDK 플랫폼 버전 7.0 (API 수준 24) 이상    
[코틀린 문법](https://cjw-awdsd.tistory.com/20){:target="_blank"}   
[코틀린_코루틴(coroutine)](https://taehyungk.github.io/posts/android-kotiln-coroutine-async-await/){:target="_blank"}   

[handelr-looper](https://velog.io/@haero_kim/Android-Looper-Handler-%EA%B8%B0%EC%B4%88-%EA%B0%9C%EB%85%90){:target="_blank"}   

[sceneform_tutorial](https://kiosk-dot-codelabs-site.appspot.com/codelabs/sceneform-intro/index.html?index=..%2F..devfest18#1){:target="_blank"}   

[arcore_example](https://androidexample365.com/hello-world-to-using-arcore-with-filament/){:target="_blank"}

[ArCore_homepage_official](https://developers.google.com/ar/develop){:target="_blank"}

[add polygon_sceneform_acore](https://stackoverflow.com/questions/54433707/how-to-draw-a-polygon-with-sceneform-arcore){:target="_blank"}   

[add line_sceneform_acore](https://stackoverflow.com/questions/51951704/how-to-draw-line-between-two-anchors-in-sceneform-in-arcore){:target= "_blank"}   

[add_ui_arcore](https://kristisimakova.medium.com/how-to-add-ui-elements-to-ar-scene-in-arcore-d2ba64454478){:target="_blank"}   

[create-renderables](https://developers.google.com/sceneform/develop/create-renderables){:target="_blank"}   

[Custom material reference](https://developers.google.com/sceneform/develop/custom-material){:target="_blank"}

[custom_material_tutorial](https://medium.com/@benjdoherty/custom-materials-with-google-sceneform-and-arcore-a930a30f867d){:target="_blank"}

[using_custom_material](https://stackoverflow.com/questions/53437128/how-i-can-set-repeated-texture-on-an-object-in-android-arcore-sceneform-api){:target="_blank"}

[external-material(1.16.0)](https://stackoverflow.com/questions/62894670/how-to-properly-render-external-texture-in-sceneform-1-16-0){:target="_blank"}


**Anchor**
앵커는 가상 객체가 공간의 동일한 위치 및 방향에 유지되도록 해준다.

## node   
> A Node represents a transformation within the scene graph's hierarchy. It can contain a renderable for the rendering engine to render.
> Each node can have an arbitrary number of child nodes and one parent. The parent may be another node, or the scene.

### Anchor node
> Node that is automatically positioned in world space based on an ARCore Anchor.
> When the Anchor isn't tracking, all children of this node are disabled

## Camera
Ray	screenPointToRay(float x, float y)
> Calculates a ray in world space going from the near-plane of the camera and going through a point in screen space.

## Scene
**Node overlapTest(Node node)**
> Tests to see if the given node's collision shape overlaps the collision shape of any other nodes in the scene using getCollisionShape().

ArrayList<Node>	**overlapTestAll(Node node)**
> Tests to see if a node is overlapping any other nodes within the scene using getCollisionShape().
   
<code>  
By default, it will automatically use a collision shape based on the dimensions of the Renderable attached to the Node. You can use Node.setCollisionShape to override the collision shape for the node, or to set collisions on a Node that doesn't have a Renderable.
</code>
  
## MaterialFactory 
static CompletableFuture<Material>	makeOpaqueWithTexture(Context context, Texture texture)
> Creates an opaque Material with the Texture passed in.
  
CompletableFuture
: Java8 지원, 비동기
  
## ShapeFactory
static ModelRenderable makeCube(Vector3 size, Vector3 center, Material material)
> Creates a ModelRenderable in the shape of a cube with the give specifications.
  
  
## ViewRenderable 
public class ViewRenderable
Renders a 2D Android view in 3D space by attaching it to a Node with setRenderable(Renderable).
By default, the size of the view is 1 meter in the Scene per 250dp in the layout.   
Use a ViewSizer to control how the size of the view in the Scene is calculated.  
```
future = ViewRenderable.builder().setView(context, R.layout.view).build();
 viewRenderable = future.thenAccept(...);
```  
