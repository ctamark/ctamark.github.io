---
layout: single
title: "kotlin"

---

**lateinit var**    
: 변경 가능한 변수, 초기화는 런타임에 하겠다고 명시

-----
<code><pre>
val key = getKey()

when (key) {
    // 여러 개의 case값은 쉼표로 구분
    1,2,4 -> {
        println("similar key")
    }
    3 -> {
        println("correct key")
    }
    // default 대신 else를 사용
    else -> {
        println("wrong key")
    }
}

## 함수선언
// 함수 이름은 add
// Int형 a와 b라는 매개변수를 받고
// Int형 반환값을 가지는 함수라는 의미입니다.
fun add(a: Int, b: Int): Int {
    return a+b
}

## 상속
// Java Way
class Super {}
class Child extends Super {}

// Kotlin Way...?
class Super
class Child : Super()

// override
open class Shape {
    open fun draw() = Unit
}

class Rectangle : Shape() {
    override fun draw() {
        //DO
    }    
}

</pre></code>
