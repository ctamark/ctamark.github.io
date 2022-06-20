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

## 재정의 함수 등

abstract class Shape {

    // 재정의할 수 없는 함수
    fun attachOther(other: Shape) {
        //DO
    }

    // 재정의할 수 있는 함수
    open fun print() {
        //DO
    }

    // 반드시 재정의 해야하는 함수
    abstract fun draw()
}

class Rectangle: Shape() {
    
    // 재정의 불가능 컴파일 에러
    override fun attachOther(other: Shape) {
        
    }
    
    override fun draw() {
        //TODO 반드시 구현
    }
}

interface Duplicatable {
    fun duplicate(): Duplicatable
}


interface Disposable
interface Duplicatable
abstract class Shape { ... }

// extends는 ()를 사용해서 생성자를 호출해 주는 형태로,
// implements는 그냥 인터페이스 명만 사용해서 적어주는 형태로.
class Rectangle : Shape(), Duplicatable, Disposable { ... }

</pre></code>
