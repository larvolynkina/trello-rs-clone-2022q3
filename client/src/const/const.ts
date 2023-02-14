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

export const BG_COLORS = [
  'rgb(0, 121, 191)',
  'rgb(210, 144, 52)',
  'rgb(81, 152, 57)',
  'rgb(176, 70, 50)',
  'rgb(137, 96, 158)',
  'rgb(205, 90, 145)',
  'rgb(75, 191, 107)',
  'rgb(0, 174, 204)',
  'rgb(131, 140, 145)',
];
