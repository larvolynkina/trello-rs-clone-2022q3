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
  workspaces = '/workspaces',
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

export const BG_IMAGES = [
  '/assets/img/board/bg-img1.jpg',
  '/assets/img/board/bg-img2.jpeg',
  '/assets/img/board/bg-img3.jpeg',
  '/assets/img/board/bg-img4.jpeg',
  '/assets/img/board/bg-img5.jpg',
  '/assets/img/board/bg-img6.jpg',
  '/assets/img/board/bg-img7.jpg',
];

export const MARK_COLORS = [
  '#B7DDB0',
  '#F5EA92',
  '#FAD29C',
  '#EFB3AB',
  '#DFC0EB',
  '#7BC86C',
  '#F5DD29',
  '#FFAF3F',
  '#EF7564',
  '#CD8DE5',
  '#5AAC44',
  '#E6C60D',
  '#E79217',
  '#CF513D',
  '#A86CC1',
  '#8BBDD9',
  '#8FDFEB',
  '#B3F1D0',
  '#F9C2E4',
  '#505F79',
  '#5BA4CF',
  '#29CCE5',
  '#6DECA9',
  '#FF8ED4',
  '#344563',
  '#026AA7',
  '#00AECC',
  '#4ED583',
  '#E568AF',
  '#091E42',
];
