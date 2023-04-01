import { File } from "buffer"

export interface credentials {
  username: string,
  email: string,
  password: string
}

export interface registerCredentials extends credentials {
  passwordRepeat: string
}

export interface loginCredentials {
  identifier: string,
  password: string
}

export interface user extends credentials {
  id: number
}

export interface Team {
  name: string,
  game: string,
  prime_id: string
}