export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  user = 'USER',
  board = 'BOARD',
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
  board = '/board',
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
