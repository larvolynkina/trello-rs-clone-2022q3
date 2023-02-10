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
  url = 'http://localhost',
  port = '3001',
}

// временные константы
// export const boardId = '63e498d32543db99498cc044';
// export const userId = '63e492352543db99498cbdf0';
