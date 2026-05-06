/**
 * Create a new post
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function main() {
  const title = process.argv[2]
  if (!title) {
    console.error('Usage: pnpm create:post "Post Title"')
    process.exit(1)
  }

  const date = new Date().toISOString().slice(0, 10)
  const year = new Date().getFullYear()
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const filename = `${date}-${slug}.md`
  const filepath = path.join(__dirname, '..', 'src', 'content', 'posts', String(year), filename)

  fs.mkdirSync(path.dirname(filepath), { recursive: true })

  const content = `---
title: ${title}
description: 
date: ${date}
tags:
  - 
---

# ${title}

> this is a placeholder.

## Overview

This is a new post.

## Conclusion

Stay tuned for more content!
`

  fs.writeFileSync(filepath, content, 'utf-8')
  console.log(`Created post: ${filepath}`)
}

main()
