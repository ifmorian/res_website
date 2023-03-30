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

export interface team {
  
}