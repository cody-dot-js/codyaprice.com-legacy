---
title: "Cool UI Tricks: Pointer Event Passthrough on my Site's Primary Navigation"
date: 2019-12-20T01:18:49.853Z
description: '"You have to be transparent so you no longer ~~cast a shadow~~ block clicks but instead let the ~~light~~ clicks pass through you" - Kamand Kojouri...*ish*'
tags:
  - UI
  - React
  - JavaScript
  - CSS
  - Web Development
  - UX
  - User Experience
  - User Interface
  - Layout
  - Positioning
  - Learning
  - Playground
hero:
  src: ./images/hero-image.jpg
  alt: "Photo by Aleks Dahlberg on Unsplash"
  caption: "Photo by [Aleks Dahlberg](https://unsplash.com/@aleksdahlberg) on [Unsplash](https://unsplash.com/s/photos/transparent)"
---

import { Example } from "../../mdx"
import MockNavigation from "./components/MockNavigation"
import BoxModel from "./components/BoxModel"
import RelativePositioning from "./components/RelativePositioning"
import AbsolutePositioning from "./components/AbsolutePositioning"
import StackingContexts from "./components/StackingContexts"
import DestroyAllClicks from "./components/DestroyAllClicks"

> "You have to be transparent so you no longer ~~cast a shadow~~ block clicks but instead let the ~~light~~ clicks pass through you" - Kamand Kojouri..._ish_

---

## Post Mortem: Or, Hey Friends 👋

Look. 👀
I _really tried_ to keep this article short and sweet.
But, I failed.
It may seem long (because it kinda is 😬), but stick with me!
It's worth it, trust me. 🤞

<small>
  Also, you can skip around if you already know some parts or if you ain't interested in the juicy deets. 💅
</small>

![Ight imma head out. 🧽🚶‍♂️](https://devcprice-codyaprice-assets.s3-us-west-2.amazonaws.com/blog/0010-cool-ui-tricks-pointer-event-passthrough-on-my-sites-primary-navigation/images/ight-imma-head-out.png)

<figcaption>
  Ight imma head out. 🧽🚶‍♂️
</figcaption>

Back to the post.

## What's up Cody?

I recently updated my primary navigation.
You know, this thing:

![Primary navigation, with minor annotations.](https://devcprice-codyaprice-assets.s3-us-west-2.amazonaws.com/blog/0010-cool-ui-tricks-pointer-event-passthrough-on-my-sites-primary-navigation/images/primary-navigation.png)

<figcaption>
  Primary navigation, with minor annotations.
</figcaption>

Underneath the primary navigation is a [stripe](https://www.stripe.com) inspired header.
Inside the clipped header is a `<canvas>` element that renders a starry background that you can interact with through hover and clicking.
Hovering produces a _"brightening"_ effect on stars adjacent to the mouse, like so:

![Navigation mouse hover animation](https://devcprice-codyaprice-assets.s3-us-west-2.amazonaws.com/blog/0010-cool-ui-tricks-pointer-event-passthrough-on-my-sites-primary-navigation/images/navigation-hover.gif)

<figcaption>
  Navigation mouse hover animation
</figcaption>

And clicking allows you to _"blow up"_ the stars, blasting them in all directions:

![Navigation mouse click interaction](https://devcprice-codyaprice-assets.s3-us-west-2.amazonaws.com/blog/0010-cool-ui-tricks-pointer-event-passthrough-on-my-sites-primary-navigation/images/navigation-click.gif)

<figcaption>
  Navigation mouse click interaction
</figcaption>

## The Problem

The navigation is rather delightful to play with.
Unfortunately, you originally could not click or hover on the region between my name and the navigation links.

![Call my navigation Sprint because this was a dead zone, my friend. 🤙](https://devcprice-codyaprice-assets.s3-us-west-2.amazonaws.com/blog/0010-cool-ui-tricks-pointer-event-passthrough-on-my-sites-primary-navigation/images/annotated-primary-navigation.png)

<figcaption>
  Call my navigation Sprint because this was a dead zone, my friend. 🤙
</figcaption>

Even though there doesn't appear to be anything between my name and the list of links, pointer interactions fail to register!

![The navigation blocks any interactions with the stars! 🙅‍♂️](https://devcprice-codyaprice-assets.s3-us-west-2.amazonaws.com/blog/0010-cool-ui-tricks-pointer-event-passthrough-on-my-sites-primary-navigation/images/navigation-blocks-interaction.gif)

<figcaption>
  The navigation blocks any interactions with the stars! 🙅‍♂️
</figcaption>

Bummer! 😢

> How do we fix that!? 🧐

## Interactive Example Time ⏰

Let's play around with some interactable examples!
In each example, you can click and hover on things within the dashed boxes.
I've created a mock navigation header that loosely resembled the primary navigation on my site.
Think of it like if you turned the graphics settings **_way_** down.

For this first example, I want to demonstrate the way my navigation originally worked; or, what happens when the navigation blocks interaction as if there's an invisible wall.

As you click on items, the _"Last clicked"_ element will update to display what you last clicked on.
You can do the following:

- The background is both _clickable_ **and** _hoverable_
- The avatar circle is both _clickable_ **and** _hoverable_
- The navigation region is _clickable_
- You can toggle on/off the visibility of the navigation bounds (note: this does not remove them entirely; they are still rendered, but will just be completely transparent or invisible)

_Isn't it odd that there's a central region where an interactivity dead zone exists?_

<Example caption={`An interactable example displaying our "invisible wall"`}>
<MockNavigation />
</Example>

## What Went Wrong

The above behavior is unsurprising if you're familiar with DOM flow and stacking contexts.
But, to the average person, it provides a **_bad user experience_** because it breaks the [Principal of Least Astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment).
You would expect the starry background in my primary navigation to be interactable in all of its rendered regions.
It is jarring to experience that _"invisible wall"_.
I want to explain more on why this wall exists, but first, here's the same example from above, but now you can also toggle on/off the _"invisible wall's"_ **_"presence"_**.

<Example caption={`An interactable example with the ability to remove the "invisible wall"`}>
<MockNavigation
    pointerEventPassthroughEnabled
    passthroughInitialValue
  />
</Example>

When the navigation bounds are visible, but we remove the _"invisible wall"_, the background can receive our click!

![Still image: The click passes through the navigation region and registers on the background!](https://devcprice-codyaprice-assets.s3-us-west-2.amazonaws.com/blog/0010-cool-ui-tricks-pointer-event-passthrough-on-my-sites-primary-navigation/images/click-passthrough.png)

<figcaption>
  Still image: The click passes through the navigation region and registers on the background!
</figcaption>

## How it Works

TLDR: [pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)!

There is a CSS property called `pointer-events` which allows you to manipulate if a DOM element receives pointer events (e.g. `click`s, `hover`, etc).
If you set it to `none`, then that element and all of its children will no longer process pointer events!

🤯

Let's look at the simplified DOM of my navigation with minimal styling using [emotion, an incredible css-in-js library](https://emotion.sh/docs/introduction):

```jsx
/* top level element sets pointer events to none */
<div css={{ pointerEvents: "none" }}>
  <div css={{
    display: "flex",
    alignItems: "center",
    position: "relative" {/* 👈 this is important */}
  }}>
    {/* The starry background 👇*/}
    <div css={{ position: "absolute" }}> {/* 👈 this is important */}
      <canvas>✨</canvas>
    </div>
    <nav
      css={{
        display: "flex",
        justifyContent: "space-between",
        position: "relative" {/* 👈 this is important */}
      }}
    >
      {/* manually enable pointerEvents for all children after here */}
      <a href="#" css={{ pointerEvents: "auto" }}>
        Cody A. Price
      </a>
      <ul
        css={{
          display: "flex",
          listStyle: "none",
          margin: 0,
          pointerEvents: "auto"
        }}
      >
        {/*
          These will inherit `pointer-events: auto;`
          from the parent <ul> by default
        */}
        <a href="#">Blog</a>
        <a href="#">About</a>
      </ul>
    </nav>
  </div>
</div>
```

Notice that we turn off all `pointer-events` on the parent element and then selectively turn `pointer-events` back on for **_specific children_**.

![If you're saying I play favorites, you're wrong. I love all my children equally.](https://devcprice-codyaprice-assets.s3-us-west-2.amazonaws.com/blog/0010-cool-ui-tricks-pointer-event-passthrough-on-my-sites-primary-navigation/images/i-love-all-my-children-equally.gif)

<figcaption>
  If you're saying I play favorites, you're wrong. I love all my children equally.
</figcaption>

### Unpacking it All

There's a lot to unpack here, so let's get down to business.

![Let's get down to business!](https://devcprice-codyaprice-assets.s3-us-west-2.amazonaws.com/blog/0010-cool-ui-tricks-pointer-event-passthrough-on-my-sites-primary-navigation/images/lets-get-down-to-business.gif)

<figcaption>
  Let's get down to business!
</figcaption>

We need to talk about DOM flow, the box model, positioning, and stacking contexts.
Be warned, I am going to gloss over a lot of the details because these topics deserve a post in themselves.
There's a ton of nuance at play, so **_readers ye be warned_** 🏴‍☠️, but please bear with me 🐻.
Each one is tightly coupled to one another because it is how layout is performed in your browser!
Feel free to skip this section (or any of the sub-sections) if you're up to speed on these topics.

Also, keep in mind that this section is pure **_background information_**.
You don't _need_ to read it, but I highly suggest that you do!
It's informative and has some cool and insightful interactive examples. 🤓

[Skip link](#you-got-your-chocolate-in-my-peanut-butter-)

- [The Box Model](#the-box-model)
- [DOM Flow](#dom-flow)
- [Positioning](#positioning)
- [Stacking Contexts](#stacking-contexts)

For everyone else, let's go! 🏌️‍♂️
First, let's talk through the box model.

#### The Box Model

![The boxing model, probably a derivative of or adjacent to border-box 🥁🤷‍♂️😂](https://devcprice-codyaprice-assets.s3-us-west-2.amazonaws.com/blog/0010-cool-ui-tricks-pointer-event-passthrough-on-my-sites-primary-navigation/images/boxing.gif)

<figcaption>
  The boxing model, probably a derivative of or adjacent to border-box 🥁🤷‍♂️😂
</figcaption>

In HTML and CSS, everything is a box or rectangle (even circular things)!
You can manipulate each box's size, position, and presentational styling using CSS.
According to MDN's [box model docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model):

> Every box is composed of four parts (or areas), defined by their respective edges: the content edge, padding edge, border edge, and margin edge.

![MDN's Box Model Graphic](https://devcprice-codyaprice-assets.s3-us-west-2.amazonaws.com/blog/0010-cool-ui-tricks-pointer-event-passthrough-on-my-sites-primary-navigation/images/mdn-box-model.png)

<figcaption>
  MDN's Box Model Graphic
</figcaption>

You should also be aware of the difference between `inline` or `block` elements.
What's described above is directly applicable to `block` elements.
MDN also has a great [doc](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout/Block_and_Inline_Layout_in_Normal_Flow#Elements_participating_in_an_inline_formatting_context) on `inline` vs `block` flow, but the main takeaways are that `inline` elements:

- They are only as big as they need to be, e.g. all of the words or text in this post! Think of them as a box, but shrinkwrapped up nice and tightly to take up as little space as possible.
- When placed next to one another, they _"flow"_ together in the document's text direction, e.g. left to right. Think about how words flow together within a paragraph.
- They are still "boxes", but you can't determine their size directly. Instead, it's inferred from how much "stuff" is inside them!

Lastly, for understanding the box model, let's go through an interactive example of `box-sizing`.
In the following rendering, you can change the properties of each box and see their size and visual properties update in real-time.
It should give you a good idea of how the box model works in general!

<Example caption={(
<>
Interactive Example: Demonstrate the difference between <code>box-sizing</code> types: <code>content-box</code> (initial & default) vs <code>border-box</code>
</>
)}>
<BoxModel />
</Example>

##### Box Model: The Takeaway

**_With HTML and CSS, it's boxes all the way down!_**
Even if it doesn't appear that way, everything is a box.
This is part of why the navigation box originally blocked inner pointer interactions!

Next, we're drifting into DOM flow. 🌊

#### DOM Flow

For starters, there's [normal flow](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction#Normal_flow), which MDN says is:

> Normal flow is how the browser lays out HTML pages by default when you do nothing to control page layout.
>
> Note here how the HTML is displayed in the exact order in which it appears in the source code, with elements stacked up on top of one another

By default for English locales (bear with me 🐻, I'm glossing over a lot of details), the markup is rendered from left to right, top to bottom.
We've already touched on this briefly above in [the box model section](#the-box-model).
Now, you _can_ stack elements on top of one another visually with CSS, namely through **positioning** and the use of **stacking contexts**.
Conveniently, these are the two upcoming sections!

##### DOM Flow: The Takeaway

Without changing any CSS, elements will render in the order that you define them in the DOM (your code).

Now, let's _position_ ourselves to understand the remaining two sections.

#### Positioning

> Position yourself well enough, and circumstances will do the rest
>
> Mason Cooley

If you ever find yourself wanting to do _interesting_ things with a website (read as to make it pretty and not look like it came out of 1995), then styling paired with positioning will probably be of interest to you.

By default, DOM elements will be rendered with `position: static;`.
You don't need to set this, the browser will do it for you!
All it does is makes the element participate in its _normal layout behavior_, e.g.

```html
<h1>Mr. Booshded Neynaleavun</h1>
<p>Date: September 11, 2001</p>
```

will behave identically to:

```html
<h1 style="position: static;">Mr. Booshded Neynaleavun</h1>
<p style="position: static;">Date: September 11, 2001</p>
```

even though we've explicitly **_"positioned"_** (but, we haven't 😉) both elements!

I must sound like a broken record, but again, MDN comes in clutch with amazing docs on [positioning](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
I'll summarize the main points below.
We've already talked about `static` (or default) positioning and while it has its place, it can be rather boring.
In the upcoming subsections, I'll explain the gist of `relative`, `absolute`, and `fixed` positioning.
I'll leave out `position: sticky` for now, just so this post doesn't become a full-on DOM layout rendering 101 tutorial 😂.

##### Top, Bottom, Left, and Right

When set, these properties are used to **_offset_** an element from its _normal_ position.
This will make more sense in upcoming examples, I promise.
Read on! 📖

##### Relative Positioning

Relative positioning can take a second to wrap your head around, but once you get it it's really neat.

So, remember how`static` positioning just means "Hey browser, put me where I fit"?
Well, `relative` positioning behaves the same.

_Until you set `top`, `right`, `bottom`, and/or `left`_.

When you set one or more of those properties (assuming to a non-zero, default value), then the `position: relative;` element will shift in the direction you told it by the amount you told it to!

Here's an interactive example to drive this point home.
Try setting the `top` field to `-4rem`, for example.
What do you see? 👀
What happens if you turn off position relative, but still set one of the positional properties, e.g. `top`?

<Example caption={(
<>
Interactive Example: Demonstrate <code>position: relative</code> when used with <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code>.
</>
)}>
<RelativePositioning />
</Example>

Note: positioning direction with `top`, `right`, `bottom`, and `left` follows a potentially confusing pattern.
If you give one of those properties a **_positive_** value, it shifts the element in the **_opposite_** direction, e.g. `top: 10px` will not move the element **UP** `10px`, but instead **DOWN** `10px`.
**_Negative_** values shift the element in the specified direction, e.g. `top: -10px` will move the element **UP** `10px`.

Notice that the `Move me around!` element appears to hover over other elements (except for the form elements 😉).
This is a cool side-effect is of setting `position: relative;`: you get a `z-index` for free.
It's really `z-index = 0`, but it becomes and appears positioned above static elements!
This will come in handy down below in the [stacking contexts subsection](#stacking-contexts).

##### Absolute Positioning

![Only a Sith deals in absolutes.](https://devcprice-codyaprice-assets.s3-us-west-2.amazonaws.com/blog/0010-cool-ui-tricks-pointer-event-passthrough-on-my-sites-primary-navigation/images/only-a-sith-deals-in-absolutes.gif)

<figcaption>
  Only a Sith deals in absolutes.
</figcaption>

Unlike `relative`, an `absolute` element no longer exists in the normal DOM flow.
Instead, it is bound to its **_containing element_**.
The _containing element_ is determined by a fancy algorithm described [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#Identifying_the_containing_block).
Basically, for `position: absolute;`, the containing element is generally (here comes ~~dat boi 🐸~~ the nuance) nearest ancestor whose `position` is **_not_** `static`.
If one doesn't exist, it becomes the **_initial containing block_**, which is the block that contains the `documentElement`, or the `<html>` tag.
The initial containing block has the size of the browser viewport.

As is tradition, here's an interactive example! 💃
Which element is the **_containing element_** of the `position: absolute`'d one?

<Example caption={(
<>
Interactive Example: Demonstrate <code>position: absolute</code> when used with <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code>.
</>
)}>
<AbsolutePositioning />
</Example>

Play around with the positional attributes `top`, `right`, `bottom`, and `left` to get a feel for how the position of the `Move me around!` element works.
For those playing along, the div (box) with the solid black border is `position: relative`, so it is the **_containing element_** of the `Move me around!` element.
This is because it is the first parent that isn't `position: static`!

Fun fact: the starry background in my site's navigation is set to `position: absolute;`.
Can you guess what its containing element is? 🤔

##### Fixed Positioning

This is similar to `position: absolute;`, except instead of being offset relative to its parent, a `fixed` positioned element is offset relative to the browser viewport (bounds).
I haven't used this in my navigation code, but I figured I'd call it out since it's useful! 🗣

##### Positioning: The Takeaway

Positioning is one tool in our toolbox for massaging the DOM into the correct looking shape that we desire. It allows you to do cool things like move things around and stack elements on top of others (like for a modal, popup, or tooltip).

And finally, it's time to _rack em', **stack** em', and pack em'_.

#### Stacking Contexts

> You can do anything with stacks and iteration that you can do with recursion
>
> Steve McConnell

As we saw when discussing [positioning](#positioning), _positioned elements win over non-positioned elements_.
In cases where there are multiple positioned elements, the way to control which has overlapping precedence is with the `z-index` CSS property. The `z-index` CSS property is an integer value that describes how "high" the element would be elevated off the page if it were in 3D space.

Let's check out a simple interactive stacking example.
There's a non-positioned (i.e. `position: static`) blue box, a red `position: relative` box at `z-index: 2`, and a green box that you can control which defaults to `z-index: 1`.
At the start, the red box is visually "on top" of the other two boxes, followed by the green box, and finally the blue box.
What happens when you set the green box's `z-index` to 2? To 3? To 0?

<Example caption={(
<>
Interactive Example: Demonstrate <code>z-index</code>.
</>
)}>
<StackingContexts />
</Example>

##### Stacking Contexts: The Takeaway

We saw before in the [positioning section](#positioning) that anything that isn't `position: static` has the ability to use `z-index`.
The `z-index` CSS property allows you to manage how elements overlap others.
The higher the `z-index` (if not `position: static`), the more likely an element will visually appear on top of others.

## You Got Your Chocolate in my Peanut Butter 😔

Does it make sense to use CSS for disabling an element and its children's `pointer-events`?
It seems kind of odd to me that such behavior is delegated to CSS instead of Javascript.
I mean, it's not like [`cursor: pointer`](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) where it's a **_purely "presentational"_** effect.
With Javascript, (examples following being of the React flavor) you enhance DOM elements by adding `event listeners` which trigger on interactions providing the desired functionality.
By setting `pointer-events: none;` on a DOM element, you are turning off all cursor interactions for **_it and its children!_**
This is crazy to me! 😜
Sounds an awful lot like a Javascript concern, namely something like:

```js
function DestroyAllClicks() {
  const [count, setCount] = React.useState(0)

  function increment() {
    setCount((c) => c + 1)
  }

  function preventAllClicks(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div onClickCapture={preventAllClicks}>
      <button type="button" onClick={increment}>
        Increment count
      </button>
      <p>Count = {count}</p>
    </div>
  )
}
```

<Example caption="Interactive example: prevent all click handlers from processing in children using Javascript">
  <DestroyAllClicks />
</Example>

It pushes me further and further from the _misguided_ belief that your ~~peanut butter shouldn't mix with my chocolate~~ UI concerns should be separated.
The lines are so blurred now.
Javascript isn't just for adding _"functionality"_, it's also for rendering and animations.
CSS isn't just for presentational styling, it's also for interactivity/functionality.
And with web components, well, the lines continue to be blurred!

## Conclusion

I strive for great UX, but it's a constant battle.
This site, as of writing this article, still has a long way to go, but **_iterators gonna iterate_**.
It's all too easy to get caught up in the technical details when developing something.

- What should `${it}` do?
- What are the requirements?
- Do you provide a good user experience?

Initially, I thought I hit the mark for my navigation bar (technically I still haven't because my mobile nav is atrocious 😲🤷‍♂️😂).
But, only by taking a step back and looking at the full context of where the navigation was rendered and how it should interact with its adjacent elements (in the DOM order or stacking order) was I able to fully address my requirements and provide a good user experience.
And I got to learn about and use a cool, but odd CSS property along the way!
