#!/usr/bin/env node
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { syncBundle } from './lib/upstream-sync.mjs'

const {values}=parseArgs({options:{upstream:{type:'string'},check:{type:'boolean',default:false}}})
if(!values.upstream)throw new Error('--upstream <pinned root containing source-release.json and skills/> is required')
console.log(JSON.stringify(syncBundle({packageRoot:resolve(fileURLToPath(new URL('..',import.meta.url))),upstreamRoot:values.upstream,engine:'remotion',check:values.check}),null,2))
