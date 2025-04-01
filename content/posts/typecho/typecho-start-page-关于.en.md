---
title: About
date: '2020-11-18T15:26:00Z'
slug: start-page
tags: []
categories:
  - typecho
---

## About the Website  

No grand introductions here, just bits and pieces  

## [Article List][2]  

Click the title to view the list of articles  

## [User Registration][1]  

If any friends wish to register, click the title to sign up. Welcome to share your thoughts and experiences.  

## About Myself  

Verbally, my logic struggles to keep up with my thoughts. I prefer practical work over idle speculation and value genuine experiences over empty actions. I enjoy tinkering with new computer-related technologies, both hardware and software. Over the past three years, I’ve built an integrated system—from sensors to microcontrollers to servers—as part of my thesis. I dislike competing for superficial recognition but still want to prove myself. I’ve participated in two mathematical modeling competitions, never achieving the top rank, but the results weren’t bad either.  

Once aspiring to become an information security expert, I ended up in the broader field of "big security" due to a major mix-up. Generally, I prefer the bigger picture, but the fact that careers in big security are often labeled as "security administrators" gives me a headache. Fortunately, my past interest has now become both an assistant and a source of joy in my work.  

Currently, my ambition is to become a writer and pen novels after retirement. As such, I pay extra attention to insights from life and work, reading and jotting down notes in my free time to accumulate ideas and words. When exhausted, I unwind by gaming or calling friends.  

[1]: http://42.192.117.142/admin/register.php

### The Difference Between "==" and "equals()" in Java  

In Java, `==` and `equals()` are both used to compare whether two objects are equal, but they differ in their implementation and usage.  

#### 1. `==` Operator  

- The `==` operator compares whether two objects are the same instance in memory, i.e., whether they point to the same address.  
- For primitive data types (e.g., `int`, `char`, `boolean`), `==` compares their values.  
- For reference types (e.g., `String`, custom objects), `==` compares their memory addresses.  

Example:  

```java
String str1 = "hello";
String str2 = "hello";
String str3 = new String("hello");

System.out.println(str1 == str2); // true, because they point to the same constant in the string pool  
System.out.println(str1 == str3); // false, because str3 is a new object with a different address  
```

##### 2. `equals()` Method  

- The `equals()` method is used to compare whether the contents of two objects are equal.  
- By default, the `equals()` method in the `Object` class behaves the same as `==`, comparing memory addresses. However, many classes (e.g., `String`, `Integer`) override this method to compare content.  
- For custom objects, you need to override the `equals()` method to define your own equality logic.  

Example:  

```java
String str1 = "hello";
String str2 = new String("hello");

System.out.println(str1.equals(str2)); // true, because the contents are the same  

// Custom object example  
class Person {
    String name;
    int age;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && name.equals(person.name);
    }
}

Person p1 = new Person("Tom", 20);
Person p2 = new Person("Tom", 20);
System.out.println(p1.equals(p2)); // true, because name and age are the same  
```

#### Summary  

- Use `==` to compare primitive types or check if two references point to the same object.  
- Use `equals()` to compare the logical equality of objects (e.g., content).  
- For custom objects, remember to override `equals()` (and `hashCode()`) to ensure correct behavior in collections like `HashMap` or `HashSet`.  

Understanding the difference between these two is crucial for writing correct and efficient Java code!  

[2]: http://42.192.117.142/index.php/blog
