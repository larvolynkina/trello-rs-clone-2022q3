export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  user = 'USER',
  board = 'BOARD',
  card = 'CARD',
}

export enum APIRoute {
  login = '/login',
  signup = '/signup',
  me = '/me',
  users = '/users',
  upload = '/upload',
}

export enum APPRoute {
  main = '/',
  login = '/login',
  signUp = '/signup',
  board = '/boards/:boardId',
  profile = '/profile',
  card = '/cards/:boardId/:cardId',
}

export enum AddButtonsOnBoardText {
  addColumn = '+ Добавить список',
  saveColumn = 'Добавить список',
  addOneMoreColumn = '+ Добавить ещё одну колонку',
  addCard = '+ Добавить карточку',
  saveCard = 'Добавить карточку',
}

export enum ServerDetails {
  url = 'https://trello-rs-clone-2022q3-production.up.railway.app/',
  port = '3001',
}
export const SERVER_URL = 'https://trello-rs-clone-2022q3-production.up.railway.app';
