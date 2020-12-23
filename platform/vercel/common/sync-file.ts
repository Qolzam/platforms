// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as fs from 'fs'
import {loadYaml} from './yaml'

export const syncSecret = (sourcePath: string, targetPath: string) => {
  const loadedYaml = loadYaml(sourcePath) as any
  fs.writeFileSync(targetPath, loadedYaml, 'utf8')
}

export const syncEnvironment = (sourcePath: string, targetPath: string) => {
  const loadedYaml = loadYaml(sourcePath) as any
  fs.writeFileSync(targetPath, loadedYaml, 'utf8')
}
