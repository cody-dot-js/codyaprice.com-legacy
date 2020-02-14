---
title: Planning to fail
date: 2020-01-07T18:43:26.424Z
description: Planning may be valuable, but the plan is worthless the moment it is created.
tags:
  - Planning
  - Development
  - Agile
  - Kanban
  - Backlog
  - Quarterly Planning
hero:
  src: ./images/hero-image.jpg
  alt: "Photo by Med Badr Chemmaoui on Unsplash"
  caption: "Photo by [M]ed Badr Chemmaoui](https://unsplash.com/@medbadrc) on [Unsplash](https://unsplash.com/s/photos/plan)"
---

> Planning may be valuable, but the plan is worthless the moment it is created.

---

Ah, here we are again. 😏
New year, new... quarter.
New quarter, new... planning cycle.
New planning cycle, ~~new...~~ same old, archaic process to appease the ~~gods~~ management.

From my perspective, as a developer, four things bother me about quarterly planning, _especially so in **E N T E R P R I S E**_:

1. Big Room Planning, aka BRP
2. Plans are consistent
3. _The weeds_ 🌿
4. The 70% mark

This [article](https://productcoalition.com/the-major-problems-with-safe-1e797f7e48f8) perfectly sums up my main issues with scaled _"agile"_ planning, but I want to focus on my experience.
I'll air my grievances below. 👇

---

## Please don't BRP at the table, it's impolite!

So, big room planning.
It's this **_"wonderful"_** two days at the beginning of each quarter where the entire organization crams into auditoriums and meeting rooms to ~~fight to the death~~ plan for and commit to client requests.
At a glance, it sounds great.

_The problem is, it's chock full of rigid processes, structure, and bureaucracy._

We plan because planning is valuable.
Without a planning phase, we wouldn't be able to meet the business needs, opportunities, and priorities of our clients.

However!

_The plan._ The one that is **_committed_** to should be thrown out as soon as you create it.
Maybe that's a bit harsh.
At the very least, it should **not** be as rigid as it is.

Here's the thing: as time goes on (as it tends to do 💅), priorities shift, things come up, and requirements change.
_Maybe your client decided they don't want a racecar?_

What's dope is that through agile development practices, you can meet their new needs, requirements, and/or problems head-on as opposed to being locked in.

The plan is a high-level, coarse-grained, hand-wavy pass that only has a value at the moment of inception.
And that's because...

## Plans are consistent(ly wrong)

Let me paint you a picture. 👨‍🎨

Morning scrum.
The air is thick and uncomfortably familiar.
It's halfway through the third sprint of the quarter and your product manager is trying not to overdose on anxiety medication.
You hope they're doing alright, but you know their manager is barking at them to corral their ~~resources~~ engineers.
It's nearly your turn in the speaking rotation and you know what's coming.
Your neck hair is alert, knees weak, arms heavy 🍝.
As you explain why you're four days rolled over from the estimate, your PM lets it out:

> _"What's taking so long on X? Are you blocked by something or someone? **Do I need to log a R I S K**?"_

To them, **_you are behind._**
Well, you're not behind, but _according to the plan_ you are.
_If only they understood that development ain't linear..._

Does that sound familiar?
If not, bless your heart. ❤️

The thing about plans and estimates is that they are consistently wrong about 90% of the time.
I'll be honest, I pulled that percentage out of my gut.

The fact of the matter is that you cannot account for what happens in the future, no matter how hard you try.
This is especially true when you have _external_ dependencies on other teams or, as my manager so eloquently put it, you're _building the plane as you fly it_ ✈️.

Go ahead and pad your estimate with an extra ten, thirty, or fifty percent.
It's still wrong.

Go ahead and try to break your task down into pieces as small as possible.
Estimate each of those pieces.
It's still wrong.

Don't believe me?
That's fine.
Let's try to estimate the complexity of tasks.

## We're getting lost in _the weeds_ 🌿

> How can I plan for something if I don't know the inner details?

Here's a scenario that pretty much played out verbatim this morning (I've anonymized it):

> _"Hey, so do you think you can do X?"_

Well, that depends on the scope of X.

> _"Cool. So you can? Do you have any concerns?"_

Well, I do have some concerns. I see Y and Z as bottlenecks.
Can we talk through that?

> _"Hey now, we're getting into the weeds, don't you think?
> Are you confident we can commit to this?"_

**_For 🤬sake!_**

And we wonder why "things come up" or "never go as planned"?
How can I confidently plan for something if I don't know the inner details?
No, I'm not suggesting I know every fine-grained detail.
On the contrary, I just want to know more than just the hand-wavy requirements because, as they say, **_the devil is in the details_** 👿

During planning, we should aim to align ourselves with the intent to design and implement the solutions to the problems the client has **_at this time_**.

And if the client changes their mind?
Not if, _when_.
_When_ the client changes their mind, adjust because _you're agile_.

## _The 70% mark_; Or, 70% of the time it fails every time

In my organization, there's a division that produces patient-facing applications.
I used to work directly in this group and one of their mottos during planning was to only commit to 70% of your capacity.

As a developer, your capacity is an imaginary metric that determines how much _stuff_ you can implement over a given period, generally a quarter.
So, let's say you can complete 10 units of work.
You're only supposed to commit to 7 units of work because the remaining 3 units, or 30%, are to be allocated to **_"the unknown"_** (which includes PTO, sick days, unforeseen events, etc).

So, we're back to padding estimates? 😅

Here's my issue with the above ~~rule~~ _suggestion_ (and I don't mean for this to sound as aggressive and abrasive as it may end up).
So far, management has _linearly distributed all 10 units of work throughout the quarter_.
In other words, the first 70% of the quarter is design and implementation and the last 30% of the quarter is _free space_ for `no-op` _stuff_.
This isn't explicitly stated anywhere, but it is reflected in the JIRA dashboards and charts that track quarterly progress.

When you're "behind" it could be because you took two weeks of PTO at the beginning of the quarter.
Or because you got sick and your JIRA sat in the "in progress" column for two or three days without any development.
Or because last week a production incident brought down critical infrastructure so you had to shift priorities mid-sprint and shelve your in-progress JIRA.

If you're going to shave off 30% of capacity, you cannot assume it will be equally distributed throughout the quarter.
Also, who are we kidding with this capacity metric? 🤔

## Conclusion

As it stands, I strongly dislike the planning week.
It feels like a waste of time past the initial hour or two of the first day.

Going forward, I would love to approach planning differently.
Luckily, this time we were able to deviate even though we're still tied to the bureaucracy and paperwork 🤙.

Instead of the churn and burn, let's maintain a priority queue backlog of work.
Planning should be a continuous process, like recurring scrum and retro meetings.
A priority queue is great for this because it's not an immutable source of truth.
If a task shifts priority, the queue adjusts accordingly, and thus we do too.
That's true agility.

And please, let's skip the estimations because they're **never correct**.
