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
</pre></code>
