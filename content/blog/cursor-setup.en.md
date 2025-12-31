---
slug: cursor-setup
locale: en
title: Cursor Setup as a Cursor Ambassador
description: Level up your Cursor workflow with tips and tricks I've learned and gathered from the community.
date: 2024-12-15
tags:
  - cursor
  - tutorial
  - ai
featuredImageUrl: null
readingTimeText: 7 min read
published: true
stageType: article
eventLocation: null
eventDate: null
ctaLabel: Read more
ctaUrl: null
---

# Cursor Setup as a Cursor Ambassador

## Adapt or be left behind

After years of building applications and exploring new technologies, it's been shocking how much my developer experience has changed with the arrival of AI tools.

A quick self-reflection was a good place to start. I asked myself what my main pain points were when developing software. Was I spending too much time on repetitive tasks, or maybe I was struggling to find the right tools to solve a problem?

## No size fits all

As a developer, I've always been a big fan of the "no size fits all" approach. I believe that the best way to develop software is to find the most optimal way to solve a problem, it doesn't matter if it's a task, bug or the way you code, it won't always be the same.

With that mindset, and after exploring different tools and workflows, as a technical person, Cursor is the perfect tool for me. I don't rely on unsupervised AI agents to code for me, but I use them to help me with mundane tasks, like generating code, writing documentation, or even finding the right tools to solve a problem.

It evolved to a point where I was using Cursor to write most of my code. My role became more of a software architect, and I was able to focus on the most complex problems, and less on the repetitive tasks.

## (Not) From the ground up

I won't be focusing on the UI/UX of Cursor, nor the base features (that might be covered in other posts), but I'll be sharing my workflow and how I use Cursor to improve my productivity.

### Auto is your best friend, isn't it?

When you start using Cursor, you might feel overwhelmed by the amount of options available for your models to use, so you might end up going with the _**"auto"**_ option, and that's totally fine. Most of the time for the simplest tasks it's enough and will work just fine, but you might find out that when the chat context gets longer, you keep seeing inconsistent answers from the model, both in the chat and in the code editor.

I stopped using the "auto" option a while ago, just a heads up, I'm a bit "cost insensitive" when it comes to AI tools, but I'm sure you can find a model that fits your needs and your budget. My go-to models are:

* **Plan**: `GPT-5.1` and `GPT-5.2 High`
* **Coding**: `Composer 1` for the simplest tasks, `Opus 4.5` for the heavy guns.
* **UI/UX**: `Opus 4.5` if we are not starting from scratch, otherwise `Gemini 3.0` is my go-to to create a design system.
* **Documentation**: `Sonnet 4 1M` because it has one of the highest context windows, else `Composer 1` or `Sonnet 4.5` are good options.
* **Questions**: `Composer 1` can answer anything already implemented, haven't encountered any problems with it yet.
* **Debug**: This is a tricky one, mostly I've been using `GPT-5.1` to debug, but infrastructure related issues are better handled with `Opus 4.5`.

## Commands and rules

Repeated tasks are an inherent part of software development, and they can be a pain to automate because most of the time they are not worth the effort, but sometimes they are so it's hard to develop and outside solution for it. Take, for example, when working with `TypeScript` you want your project to build successfully, you might want to run `tsc` to check for errors, but you might also want to run `tsc` with the `noEmitOnError` flag to check for errors and warnings. What if we have eslint in place for one project, but biome for another? That's where commands and rules come in.

### Rules

Think of rules as a way to guide the model to the right direction. You can use them to enforce a certain behavior or code style. The agent will try to follow and apply them smartly, that depends on your setup.

Some good news is that you don't need to reinvent the wheel, there are already some great rules out there at Cursor Directory.

### Commands

So, what's the difference between a rule and a command? In my opinion, a rule is more about the code itself, while a command is more about the task at hand. A rule is a way to guide the model to the right direction, while a command is a way to execute a task.

Commands are executed inside the chat agent with `/`, we can store them at the `.cursor` directory, or have them available at our account level. This is a great way to extend the agent with your own tools and workflows.

### That's it?

Yes, for now at least. This proves that some simple smart prompts can go a long way, and that you don't need to be a genius to use AI tools to your advantage.

