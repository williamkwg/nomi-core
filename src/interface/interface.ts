export interface defaultConfInter {
  readonly port ?: number,
  controllerDir: Array<string> | string,
  logDir: string,
  serviceDir: Array<string> | string,
  middlewareDir: Array<string> | string,
  pluginDir: Array<string> | string
}
export interface logConfig {
  appLog ?: string | Object,
  errorLog ?: string | Object,
  coreLog ?: string | Object
}

export interface mwConfig {
  global ?: Array<any>,
  local ?: Array<any>
}

