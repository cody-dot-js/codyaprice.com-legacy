---
title: Stop Testing Implementation Details
date: "2019-08-08T17:00:00"
description: "Yes, even you, object oriented peeps. 🐤😉"
categories:
  - Web Development
  - Testing
tags:
  - Testing
  - Development
  - JavaScript
  - TDD
  - Best Practices
---

> This was originally posted on [Medium on August 8, 2019](https://medium.com/@dev.cprice/stop-testing-implementation-details-77a3528336af)

![Hero Image](./hero-image.png)

<figcaption>
  The writing is on the wall
  <a href="https://www.pexels.com/photo/man-wearing-black-and-white-stripe-shirt-looking-at-white-printer-papers-on-the-wall-212286/
">
    © pexels
  </a>
</figcaption>

Yes, even you, object oriented peeps. 🐤😉

---

I’m so into the idea of testing code well right now, especially when it comes to
best practices, methodologies, and philosophies. A lot of what I do on the daily
revolves around presentational (UI) code, specifically React. My org at work has
standardized around using [enzyme](https://github.com/airbnb/enzyme) and [jest](https://jestjs.io/).
While I enjoy using jest, enzyme and I have a complicated relationship (read as:
I strongly dislike enzyme). So, I’ve been on the lookout for better tools and
methods to test our UI code so we can have confidence that it does what we want.
I’m currently writing up an initiative to switch over to [react-testing-library](https://github.com/testing-library/react-testing-library)
because it allows us to [write tests that resemble the way our software is used](https://twitter.com/kentcdodds/status/977018512689455106)
and it makes it difficult to test implementation details, unlike enzyme which
often encourages it. **In this article, this second point is what I want to
focus on.**

https://twitter.com/kentcdodds/status/977018512689455106

<figcaption>Write your tests the way it's used</figcaption>

## Don’t write tests that are coupled to or leak out your implementation details.

In my quest for improving my org’s tests and testing practice, I’ve come across
many great articles/blog posts on testing ideologies, like:

- Eric Elliot: [Mocking is a Code Smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a) (preach! 🙏🗣)
- Kent C. Dodds: [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details).

A common theme in these posts is that your tests should be black box tests that
don’t leak implementation details, or things your consumers don’t care about or
are even aware of. As Kent C. Dodds put it, when you test implementation
details, it can lead to:

> 1. _**False negatives:** Can break when you refactor application code._
> 2. _**False positives:** May not fail when you break application code._

---

## Contrived example time! ⏰

Let’s say you’re a startup with limited resources (capital 💰) and you have an
idea for an awesome application which runs in an embedded environment. A key
feature of your application is that you can multiply two numbers. It’s
imperative that you get to market quickly so you can get paid.

![Gotta go fast!](./gotta-go-fast.gif)

<figcaption>Gotta go fast!</figcaption>

Seeing as you are broke and you need to get to market first, you choose the
cheapest microprocessor available, but the catch is it doesn’t have a
multiplication hardware unit. However, it _**does**_ have hardware accelerated
addition. Tradeoffs 🤷‍♂️. So, you get to work and write some code to multiply two
numbers using loops and addition:

```js
function multiply(a, b) {
  let acc = 0;
  const sign = Math.sign(b);
  const N = Math.abs(b);
  for (let i = 0; i < N; ++i) {
    acc += a;
  }

  return acc;
}
```

<figcaption>Looping multiplication function between two numbers</figcaption>

You’re a sane developer who follows TDD, so you write some tests for this as
well.

```js
import multiply from './multiply';

test('given any number and 0, it returns 0 regardless of order', () => {
  const a = 0
  const b = 1;
  const expected = 0;

  let result = multiply(a, b);
  expect(result).toEqual(expected);

  result = multiply(b, a);
  expect(result).toEqual(expected);
});

test('given any number and 1, it returns the other number regardless of order', () => {
  const a = 5
  const b = 1;
  const expected = 5;

  let result = multiply(a, b);
  expect(result).toEqual(expected);

  result = multiply(b, a);
  expect(result).toEqual(expected);
});

test('given any two positive numbers, it returns the positive expected result regardless of order', () => {
  const a = 5
  const b = 2;
  const expected = 10;

  let result = multiply(a, b);
  expect(result).toEqual(expected);

  result = multiply(b, a);
  expect(result).toEqual(expected);
});

test('given one positive and one negative number, it returns the negative expected result regardless of order', () => {
  const a = 2
  const b = -10;
  const expected = -20;

  let result = multiply(a, b);
  expect(result).toEqual(expected);

  result = multiply(b, a);
  expect(result).toEqual(expected);
});

test('given any two negative numbers, it returns the positive expected result regardless of order', () => {
  const a = -3
  const b = -4;
  const expected = 12;

  let result = multiply(a, b);
  expect(result).toEqual(expected);

  result = multiply(b, a);
  expect(result).toEqual(expected);
});
```

<figcaption>Testing multiplication module</figcaption>

But wait ✋! Your boss comes back and is furious 😡 because you don’t have
[100% test coverage](https://martinfowler.com/bliki/TestCoverage.html)! So,
following orders 🤖, you add the following test:

```js
import multiply from './multiply';

// pretend we can "spy on" for loops, or worse, that
// you refactor your code to call an add() method which
// you spy on and then expect it to be called N times..
test('given 2 and 5, it should loop 5 times', () => {
  spyOn(for); // hol' up: pretend we can spy on for loops 🕶

  const a = 2;
  const b = 5;
  const expectedCount = 5;

  multiply(a, b);

  expect(for).toHaveBeenCalledTimes(expectedCount);
});
```

<figcaption>Testing multiplication module implementation details</figcaption>

Hurray! We’ve hit 💯% coverage! Surely this isn’t foreshadowing! Now, you can
finally release to prod, get clients, and that first paycheck you’ve been
promised. 😎

## Enter competitor B, who promises the same features as your application, but with huge performance benefits (especially when it comes to multiplication).

Oh no 😰! Well, at least your company can now afford to purchase a beefier
microprocessor that has hardware accelerated multiplication built in. So, you
convince your boss to buy new silicon, build up a prototype, and load your
existing code on it. Initially, itdoesn’t run any faster though. No worries, we
just need to change out the implementation of `multiply` so that it utilizes
that hot new `*` operator!

```js
function multiply(a, b) {
  return a * b;
}
```

<figcaption>Simple (typical) multiply function between two numbers</figcaption>

Easy. Clean. Solid. It runs beautifully on the new hardware. So fast!

Before opening a PR to bless your colleagues with the performance gains 💪, you
run your tests:

> ✅✅✅✅✅❌

What?? _It’s just multiplication_. The test that failed? The last one we wrote.
The one that tested and leaked implementation details. _**This was a false
negative**_. So long 100% test coverage.. 😩

## What value did the test that leaked implementation details give us? None.

Actually, you can argue that it gave you _**negative value**_, or in other
words, it cost you. It cost you because it added noise to your tests and wasn’t
testing anything that actually mattered. It failed when the functionality
remained the same, but the hidden details under the covers changed. It failed
when we should’ve been celebrating the magnitudes of performance gains.

---

## Cody, surely this is just a hypothetical

While the above example may be contrived, you can easily replace the application
and feature with any given idea or functionality in your own app’s core feature
set or internal business logic.

For example, let’s say that you’re wanting to keep a list of tags for an item in
your product catalogue. Do you implement this as an array of strings? A hashmap?
Linked list? Should we persist this in a database? Put it in the cloud? Install
one more dependency to manage it? Does it matter?

Well, according to my favorite engineering answer ever:

> _It depends._

## Let's talk about trade-offs

There’s always trade-offs for any given decision, implementation or otherwise.
Are you burdened with memory constraints? Does this code run in a hot path, so
anything `O(n)` or worse is a no go? Those are implementation concerns that
should definitely be addressed, but not within your tests. There’s another talk
about pre-optimization in here somewhere, but I digress.

When you test something, you should strive for testing its _**functionality**_,
or its public API. This does **not** include internal state, if a certain method
was called N times or with certain arguments, etc.

As Kent C. Dodds states:

> Implementation details are things which users of your code will not typically
> use, see, or even know about.

The first five tests above are examples of testing the public API. They didn’t
fail when refactoring or changing the internal plumbing. Multiplication has a
public API, its
[properties](https://www.khanacademy.org/math/pre-algebra/pre-algebra-arith-prop/pre-algebra-arithmetic-properties/a/properties-of-multiplication).
The above tests that target the properties of multiplication gave us confidence
that our code functions properly and weren’t fragile.

---

## Conclusion

In closing, as developers, it is imperative that we strive for less fragile
tests that provide actual value to us. We need tests that prove functionality
and aren’t brittle. They shouldn’t reduce the signal-to-noise ratio.
