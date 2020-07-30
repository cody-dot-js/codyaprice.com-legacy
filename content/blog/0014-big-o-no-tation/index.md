---
title: Big O(no) ...tation
date: 2020-01-22T00:21:14.249Z
description: 'Big O describes how things scale by their inputs, for both `time` and `space` complexity.'
tags:
  - Development
  - Web
  - Programming
  - Code
  - Algorithms
  - Design
  - Performance
  - Scalability
hero:
  src: ./images/hero-image.jpg
  alt: 'Photo by Roman Kraft on Unsplash'
  caption: 'Photo by [Roman Kraft](https://unsplash.com/@romankraft) on [Unsplash](https://unsplash.com/s/photos/scale)'
---

I felt inspired because of [this twitter thread](https://twitter.com/devcprice/status/1218468406934016001) to make a dedicated post on Big O notation and what it means for runtime and space complexity.

**TLDR:** Big O notation, the _"easy"_ way: Big O describes how things scale by their inputs, for both `time` and `space` complexity.

> Commit this to memory: it only depends on your inputs.

It's dealing with _growth_.
Just because a function is `O(n²)` doesn't necessarily mean that it's _slower_ than `O(n)` or `O(1)`.
All that it means is that `O(n²)` _**grows much faster** than `O(n)` or `O(1)`_.

As a consequence, Big O allows us to compare the **scalability** algorithms, even if they're completely different!

---

## Technically speaking 🗣

So, technically speaking, the above introduction and TLDR is _mostly true_.
The _academic_ definition of Big O is an _upward bound_ on growth.
That means that a constant runtime algorithm is also both Big O linear and Big O quadratic.
There also exists a lower bound, called Big Omega, labeled Ω, as well as the combination of O and Ω, Big Theta, or Θ.
But, let's not get caught up in the academic details.
In practice and industry, when we say Big O, we mean the _lowest_ upper bound.
So, if an algorithm is linear, we don't say that it's exponential because that's silly!
If you want to dig more into the nerdy bits, there's a [wiki article on it](https://en.wikipedia.org/wiki/Big_O_notation) (but you don't need to 🙈).

## Space vs. Time Complexity

Big O can help describe the growth of both the time and space complexity of an algorithm.
By the **_time_**, I mean the amount of _proportional time_ it takes to run the algorithm given the input.
This can also be interpreted as the number of **operations** given the size of the input.
By **_space_**, I mean the extra space needed to hold stateful information to perform the algorithm given the input.
Depending on the circumstances and constraints of the algorithm, you can sometimes tradeoff time for space and vice versa.
This is a common approach in many algorithms, especially in dynamic programming, which I'll have a new blog post on soon!

The most common Big O orders of algorithms that you will find, in orders of growth rate from low to high, are:

- constant: `O(1)`
- logarithmic: `O(log n)`
- linear: `O(n)`
- linearithmic: `O(n * log n)`
- quadratic: `O(n²)`
- exponential: `O(2ⁿ)`
- factorial: `O(n!)`

Here's a graph of the growth of each of these from Wikipedia.
This shows what each order tends to as they approach larger `n` inputs.

![Graphs of common orders of growth showing the number of operations N versus input size n for each](https://d1jubymwibgxp.cloudfront.net/blog/0014-big-o-no-tation/images/comparison_computational_complexity.png)

<figcaption>
  Graphs of common orders of growth showing the number of operations N versus input size n for each.&nbsp;
  <a href="https://commons.wikimedia.org/w/index.php?curid=50321072">By Cmglee, CC BY-SA 4.0</a>
</figcaption>

I'll be diving into more detail soon on what each of these means, mostly in terms of time complexity below.
But first, let's take a look at some comparative _runtimes_ between all of the above orders.
This picture comes from the [Algorithm Design Manual, 2nd Edition](http://www.algorist.com/):

![Growth rates of common functions measured in nanoseconds](https://d1jubymwibgxp.cloudfront.net/blog/0014-big-o-no-tation/images/algorithm_design_manual_growth_rates.png)

<figcaption>
  Figure 2.4: Growth rates of common functions measured in nanoseconds. (pg. 50)
</figcaption>

That picture is incredibly helpful for putting numbers to different common orders of Big O. For a little more context, each operation takes 1 nanosecond.
To get the calculated runtime, you use the `n` on the `y-axis` with the formula on the `x-axis` to calculate the _operations_, then multiply by `1 ns` per operation.

Notice that for `n²` and less, you don't notice a major difference until `n = 1-10k` items.
But for exponential and factorial growth, it matters real quick!

![Tweet: Bruce Dawson (@BruceDawson0xB) April 22, 2019](https://d1jubymwibgxp.cloudfront.net/blog/0014-big-o-no-tation/images/o-n-squared_tweet.png)

<figcaption>
  Tweet: <a href="https://twitter.com/BruceDawson0xB/status/1120381406700429312">Bruce Dawson (@BruceDawson0xB) April 22, 2019</a>
</figcaption>

> `O(n²)` is the sweet spot of badly scaling algorithms: fast enough to make it into production, but slow enough to make things fall once it gets there

Also, notice that at large `n` (10,000+), the _size_ of larger orders trumps lower ones. **_Bigly!_**
This is why you can drop all terms except the dominant (largest, highest growing) ones when categorizing an algorithm's Big O notation!
For example, if you calculate that your algorithm runs at `O(100 + 5n² + 3n)`, we say that it's an `O(n²)` algorithm.
Notice that I also dropped off any constants too because they don't matter as well!
We classify `O(3n²)` the same as `O(10000n²)` because, at large `n`, the `n²` will dominate the leading constants.
It also makes the equations simple n' pretty! 💃

---

## Common Orders: What They Mean With Examples

For now, let's focus on `O(1)`, `O(n)`, and `O(n²)`.
What kind of algorithms does each of these map to?

## Constant: O(1)

Constant time and space complexity: the time/space does not grow with the input.

### Time Complexity

Constant time access `O(1)` is what it takes to access an array element by index, or a hash map by key.
It's **constant**.
In other words, it doesn't matter how big the array or hash map gets, those operations are always constant time access.

### Space Complexity

If you need to allocate the same amount of things regardless of input in your algorithm, then you have constant space complexity, or `O(1)`.
Notice that just like time complexity, the additional space needed does not grow when the input size grows.
An example of this is holding primitive values as variables in your code, like:

```js
const time = new Date().toString(); // a string literal, independent of any input
const count = 100; // an integer literal, independent of any input
```

## Linear: O(n)

### Time Complexity

For `O(n)`, think about an array of items again.
Let's say you wanted to print out every element.
What does that mean?
Well, you have to access every element (which happens in constant time `O(1)`), but there are `n` elements in the list, so this is an `O(n)` algorithm.
Stated another way, it takes longer to print out the array when there are more items in the array (and specifically, this is a linear relationship).
For every new item you add to the list, the time to print out the whole list grows by one.
This is also the best conceivable runtime (BCR) for that: you cannot do better than `O(n)` for printing all elements of an array \_because you have to touch all `n` items in the list.

### Space Complexity

Say you want to write an algorithm that reverses the order of a list using a stack, which is a first in, last out list.
This could look something like:

```js
function reverseList(list = []) {
  const stack = new Stack();
  list.forEach((item) => stack.push(item));

  let reversedList = [];
  while (!stack.isEmpty()) {
    reversedList.push(stack.pop());
  }

  return reversedList;
}
```

The stack used grows proportional to the size of the given input list.
It grows linearly with the input list size, so we use an extra `O(n)` space!
What's the runtime of this algorithm? [^1]

## Quadratic: O(n²)

How about `O(n²)`?

### Time Complexity

Well, let's say you want to print out every element of a `2D array` (or `grid`).
The `grid` is sized at `M x N` (`rows` x `columns`).
So, this operates just like a single array sized `M`, but now you have to print out `N` of them!
So, the generic runtime of printing out a `2D grid` is `O(M * N)`, but if `M = N` (if the `grid` is a square, e.g. `4 x 4`), then you have `N * N == n²`, or `O(n²)`.
And again, the BCR here is `O(n²)` because you have to touch every element in the `grid` and there are `N * N` of them.

Let's try an example!

```js
function doSomeGridWork(grid, rows, columns) {
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      for (let k = 0; k < 100000; k += 1) {
        console.log(`k = ${k}, grid[${row}][${col}] = ${grid[row][col]}`);
      }
    }
  }
}
```

What's the runtime of this code? [^2]

### Space Complexity

Quadratic space complexity is similar to linear space complexity.
If you have an `MxN` `2D grid`, but use something like a `queue` or `stack` to keep track of all unprocessed cells, then you will need to store `O(M * N)` items.
The space required in the storage grows proportional to `O(n²)`.

---

Let's circle back to the other runtimes: `O(log n)`, `O(n * log n)`, `O(2ⁿ)`, and `O(n!)`. These are a little more complex but still fairly straightforward.

## Logarithmic: O(log n)

Logarithmic growth is very slow-growing, nearly comparable to constant.

### Time Complexity

Let's say you wanted to find an element in an array.
How long should it take?
Well, it depends.
Are we talking a sorted or unsorted list?

If unsorted, you can't tell the order, which means you have to scan the array till you find the item you're looking for, if it exists.
So, this is linear `O(n)`.
But, can we do better than that?
Well, not if it's unsorted.

However, if we have a sorted list, we can use a binary search, which only takes `O(log n)` time.
Binary search cuts the array in half each time and finds the `middle` element.
If the `middle` is what you're searching for, return that `index`.
If what you're looking for is less than the `middle`, look in the left half of the sorted list, else look in the right half.
By cutting down the array by half each time, this produces a logarithmic runtime, or `O(log n)`.
It's a very slow-growing algorithm which means that it's very fast.
You can tell if an item exists in a list of 1 BILLION items within 30 searches.
Crazy!
That's 30 vs 1B searches in the worst case!

### Space Complexity

For the binary search, you can do it with an iterative approach, like so:

```js
function binarySearchIterative(sortedList = [], key) {
  let start = 0;
  let end = sortedList.length - 1;

  while (start <= end) {
    const middle = Math.floor(start + (end - start) / 2);

    if (sortedList[middle] < key) {
      start = middle + 1;
    } else if (sortedList[middle] > key) {
      end = middle - 1;
    } else {
      return middle;
    }
  }

  return -1;
}
```

This runs in logarithmic time, but has constant space complexity.
You can also use _recursion_ to perform binary search:

```js
function binarySearchRecursive(sortedList = [], key, start, end) {
  if (!sortedList || !sortedList.length || end < start) {
    return -1;
  }

  const middle = Math.floor(start + (end - start) / 2);

  if (key === sortedList[middle]) {
    return middle;
  } else if (key < sortedList[middle]) {
    return binarySearchRecursive(sortedList, key, start, middle - 1);
  } else {
    return binarySearchRecursive(sortedList, key, middle + 1, end);
  }
}
```

This also runs in logarithmic time.
However, when it comes to space complexity, this is `O(log n)`, can you tell why? [^3]

## Linearithmic: O(n \* log n)

This comes into play mostly with sorting: e.g. merge sort and quicksort.
Both of these operate on `n` items in a list (hence the first `n` term in `n * log n`).
But, what about the `log n` term?
Well, that comes into play by borrowing the _cut the array in half method_ from binary search.
Take merge sort, for example.
You keep dividing the array down until you have sorted subsections, which takes `O(log n)` time for `log n` sections, followed by merging them back together in `O(n)` time.

## Exponential: O(2ⁿ)

Exponential growth is very easy to get caught in when using recursion if you ain't careful, especially with binary trees.
The inverse of `O(log n)`.
This will make more sense when you get into binary trees, but if you keep doubling your size as N increases, you grow very fast.
Think about the powers of two and how fast they grow (doubling):

- 2⁰ = 1
- 2¹ = 2
- 2² = 4
- 2³ = 8
- 2⁸ = 256
- 2¹⁰ = 1024
- 2²⁰ = 1 million
- 2³⁰ = 1 billion

Notice the exponent cleanly matches with the number of times you need to search in binary search!

## Factorial: O(n!)

This is kind of hard to achieve, honestly...
But it grows super freakin' quick and is ultra mega double-plus bad!
Looking back at the table at the start of this post, at `n = 20`, it takes 77.1 years to calculate 😳🤯!

## Conclusion

In practice, algorithmic `time` and `space` complexity follows common patterns that I have outlined in this post.
Big O notation is simply a way to describe them in a way that is independent of environmental or system factors.
I hope this has been helpful!
Please comment below if you have any thoughts or questions and be sure to share on your favorite social media too!
Thanks for reading! 👋

[^1]:
  The runtime of this algorithm is linear, `O(n)`.
  While we _do_ loop `list.length` times twice, remember to drop the leading constant!
  As in: `2*O(n)` becomes `O(n)`.

[^2]:
  If you said `O(n³)`, then you are...incorrect!
  The answer is: `O(n²)`!
  **_How's that so?!_**
  Remember what I said at the beginning of this post?

  > [Big O] only depends on your inputs

  The inner-most `for loop` runs the _same number of times **independent of the input**_.
  In our case, it will always run 100000 times.
  So, you can think of that as one incredibly slow operation that always runs the same number of times, even if rows and columns are small!
  This one is a tricky lil' curveball for sure! ⚾️

[^3]:
  The recursive binary search algorithm has **_logarithmic space complexity_** because it uses recursion.
  With recursion, you get a "free" stack, the calling stack, which is used on each function call.
  Since the algorithm calls itself at most `log n` times, the stack will have at most `log n` entries on it.
  This space usage doesn't come for free, so you have to be aware of it and account for it!
  If you recurse too much, you can cause a stack overflow!
