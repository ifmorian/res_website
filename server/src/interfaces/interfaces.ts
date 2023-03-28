export interface credentials {
  username: string,
  email: string,
  password: string
}

export interface registerCredentials {
  username: string,
  email: string,
  password: string,
  passwordRepeat: string
}

export interface user {
  id: number,
  username: string,
  email: string,
  password: string
}