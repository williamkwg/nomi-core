export interface defaultConfI {
  readonly port ?: number,
  controllerDir: Array<string> | string,
  logDir: string,
  serviceDir: Array<string> | string,
  middlewareDir: Array<string> | string,
  pluginDir: Array<string> | string
}
export interface logConfigI {
  appLog ?: string | Object,
  errorLog ?: string | Object,
  coreLog ?: string | Object
}

export interface mwConfigI {
  global ?: Array<any>,
  local ?: Array<any>
}

export interface coreConfigI {
  service: Array<string> | string,
  controller: Array<string> | string
}

