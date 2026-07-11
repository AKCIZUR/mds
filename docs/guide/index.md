---
title: Guide
description: Setup and authoring guide for the MaterialX docs starter.
---

# Guide

The guide section explains how the starter is organized and how to extend it safely.

## Structure

- `index.md` for the section landing page
- one Markdown file per topic
- assets in `docs/assets/`
- theme templates in `docs/overrides/`

## Recommended workflow

1. Create a new page in the relevant folder.
2. Add a front matter title and description.
3. Commit and push.
4. GitHub Actions deploys the build.

## Why this structure works

It keeps the repository simple while still allowing a growing documentation tree with automatic navigation.
