export interface Credentials {
  username: string,
  email: string,
  password: string
}

export interface RegisterCredentials extends Credentials {
  passwordRepeat: string
}

export interface LoginCredentials {
  identifier: string,
  password: string
}

export interface UserInterface extends Credentials {
  id: number
}

export interface Team {
  name: string,
  game: string,
  prime_id: string
}

export interface accountData {
  name: string,
  pfpId: string,
  division: string,
  tier: string,
  level: string
};