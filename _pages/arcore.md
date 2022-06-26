---
title: "ARCore, sceneform"
permalink: /arcore/
layout: single
---

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
  
  
