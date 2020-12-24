// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// import * as path from 'path'
import * as path from 'path'
import * as fs from 'fs-extra'
import {loadStack} from './common/load-stack'
const merge = require('deepmerge')
const del = require('del')
// import * as syncFiles from '../../common/sync-file'

/**
 * Sync with vercel platform
 * @param {string} stackPath Telar stack.yml path
 */
export const sync = async (stackPath = 'stack.yml') => {
  const {functions} = loadStack(stackPath)

  const configDir = './vercel/core/config'
  const destCorePath = './vercel/core'
  const sourceCorePath = './core'
  const sourcePkgPath = './package.json'
  const destPkgPath = './vercel/package.json'
  const destTsConfigPath = './vercel/tsconfig.json'
  const platformPath = './platform/vercel'
  const platformTemplatePath =`${platformPath}/templates`

  // Copy core directory
  await del([destCorePath])
  await fs.copy(sourceCorePath, destCorePath)

  // Merge dependencies
  const sourcePkg = await fs.readJSON(sourcePkgPath, {encoding: 'utf8'})
  const destPkg = await fs.readJSON(destPkgPath, {encoding: 'utf8'})
  destPkg.dependencies = merge(destPkg.dependencies, sourcePkg.dependencies)
  destPkg.devDependencies = merge(destPkg.devDependencies, sourcePkg.devDependencies)
  await fs.writeJSON(destPkgPath, destPkg, {encoding: 'utf8', spaces: 4})

  // Add required tsconfig fields
  const tsConfig = await fs.readJSON(destTsConfigPath, {encoding: 'utf8'})
  tsConfig.compilerOptions.experimentalDecorators = true
  tsConfig.compilerOptions.emitDecoratorMetadata = true
  await fs.writeJSON(destTsConfigPath, tsConfig, {encoding: 'utf8', spaces: 4})

  // Write functions configuration
  Object.keys(functions).forEach(fnName => {
    const fn = functions[fnName]
    fs.ensureDirSync(configDir)
    fs.writeFileSync(`${configDir}/${fnName}.conf.json`, JSON.stringify(fn, null, 4), 'utf8')
  })

  // Copy environment parser
  await fs.copyFile(`${platformTemplatePath}/parse-env.ts.tmpl`, `${destCorePath}/parse-env.ts`)
}
