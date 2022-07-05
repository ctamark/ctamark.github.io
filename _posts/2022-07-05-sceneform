
----
layout: single
title: "sceneform으로 구현하는 AR"
----
작업일지 220705
<img src="https://ctamark.github.io/sceneform-03.jpg" width=50%>
가장 최신인 sceneform 1.16.0을 사용하고자 하시는 분이 있다면 말리고 싶다.

나의 경우 
- 제공하는 기본 예제가 바로 crash되었다.
- 문제가 생길 때 자료 구하기가 싶지 않다.


그래서  1.15.0을 사용하기로 했다.

sceneform 1.15.0(=1.17.1) + billboard + custom material 
sceneform에 빌보드를 추가한 스샷이다 위 파란색 이팩트 효과는 blending add를  적용하기 위해 fragment(pixel) shader를 적용한 것이다.

sceneform에 새로운 material을 추가하는 것은 약간 조잡스럽다
자신이 원하는 material을 추가하기 위해서는 fragment shader만 추가해서는 안되고 해당 material에 연동되는 모델을 함께 등록해야 한다.

