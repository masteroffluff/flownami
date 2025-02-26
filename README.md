# Welcome to Flownami!

> [!TIP]
> This README gives a good overview of why we're building a Kanban board. If
> you're already up to speed and are ready to get stuck into the code, head over
> to [our Wiki].

Flownami is a Kanban-style board for managing tasks, stories, or to-do items.

It's a collaborative project that's being built by the attendees of the
Manchester Software Crafters group.

Aside from building a nifty app, a focus of the project is for us to learn about
the fundamental technologies of the web. We therefore don't intend to lean on
frameworks like React, Angular, Next.js, etc.

We'll be writing **semantic HTML**, using **hand-crafted CSS** to control the
look and feel, and (where required) adding support for client-side behaviour by
writing **"vanilla" JavaScript**.

And if we need to add interactive behaviour in the browser, we'll learn how to
use the relevant [browser APIs].

[our Wiki]: https://github.com/Software-Crafters-Manchester/flownami/wiki
[browser APIs]: https://developer.mozilla.org/en-US/docs/Web/API

## How we (hope to) work

Each week we meet up to work on the project. On alternating weeks we will
either:

- write code to implement the next new feature, or
- review code that was written the previous week, choose which pull requests to
  merge, and plan what to work on the following week.

On the nights that we're writing code, we should have a good idea of what we
want to do. We'll work in small teams, or individually if you prefer. There'll
be people floating around who can offer advice if you get stuck.

On the nights when we're doing code review/merging/planning, we expect to have
at least a couple of pull requests to look at. Hopefully we'll:

- learn from each other's work
- reach a consensus on an approach to take
- maybe merge a few ideas together
- incorporate changes into the main branch

Then we'll think about what to work on the following week.

That's the plan...

## Technology

Because we're aiming to **learn a lot about how browsers and the web work**,
we're keeping the technology intentionally quite light.

We chose [Deno] for the server-side programming environment. Most of the group
are familiar with JavaScript, many would prefer to write TypeScript, and Deno's
support for it is excellent.

One of the things we'll be covering is how HTTP works, so a thin wrapper around
it makes sense. The lightweight [Express] project seemed like a sensible choice,
as it exposes HTTP's methods, URLs, requests and responses nicely.

To render HTML on the server we wanted something that would be as close to raw
HTML as possible. The [EJS templating engine] was a great fit, it's basically
HTML with support for a bit of server-side logic.

[Deno]: https://deno.com
[Express]: https://expressjs.com/
[EJS templating engine]: https://ejs.co/
