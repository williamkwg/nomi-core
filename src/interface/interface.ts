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
  global ?: Array<object>,
  local ?: Array<object>
}

export interface coreConfigI {
  service: Array<string> | string,
  controller: Array<string> | string
}

export interface routerI {
  match: Function
}
