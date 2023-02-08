import axios from 'axios';
import { ServerDetails } from '../const/const';
import { IColumn } from '../types/board';

export function getAllBoard() {
  throw new Error('empty function');
}

// export async function getColumns(boardId: string): Promise<IColumn[] | Error> {
//   try {
//     const responce = await axios.get<IColumn[]>(
//       `${ServerDetails.url}:${ServerDetails.port}/columns/${boardId}`,
//     );
//     return responce.data;
//   } catch (e: unknown) {
//     let message = '';
//     if (typeof e === 'string') {
//       message = e;
//     } else if (e instanceof Error) {
//       message = e.message;
//     }
//     return new Error(message);
//   }
// }

export async function createColumn(
  userId: string,
  boardId: string,
  title: string,
): Promise<IColumn | Error> {
  try {
    const body = {
      userId,
      boardId,
      title,
    };
    const responce = await axios.post<IColumn>(
      `${ServerDetails.url}:${ServerDetails.port}/columns`,
      body,
    );
    return responce.data;
  } catch (e: unknown) {
    let message = '';
    if (typeof e === 'string') {
      message = e;
    } else if (e instanceof Error) {
      message = e.message;
    }
    return new Error(message);
  }
}

export async function updateTitleColumn(
  userId: string,
  boardId: string,
  columnId: string,
  title: string,
): Promise<IColumn | Error> {
  try {
    const body = {
      userId,
      boardId,
      columnId,
      title,
    };
    const responce = await axios.patch<IColumn>(
      `${ServerDetails.url}:${ServerDetails.port}/columns`,
      body,
    );
    return responce.data;
  } catch (e: unknown) {
    let message = '';
    if (typeof e === 'string') {
      message = e;
    } else if (e instanceof Error) {
      message = e.message;
    }
    return new Error(message);
  }
}

export async function getCardsOnBoard(boardId: string): Promise<IColumn[] | Error> {
  try {
    const responce = await axios.get<IColumn[]>(
      `${ServerDetails.url}:${ServerDetails.port}/cards/${boardId}`,
    );
    return responce.data;
  } catch (e: unknown) {
    let message = '';
    if (typeof e === 'string') {
      message = e;
    } else if (e instanceof Error) {
      message = e.message;
    }
    return new Error(message);
  }
}

export async function createCard(
  userId: string,
  boardId: string,
  columnId: string,
  title: string,
): Promise<IColumn | Error> {
  try {
    const body = {
      userId,
      boardId,
      columnId,
      title,
    };
    const responce = await axios.post<IColumn>(
      `${ServerDetails.url}:${ServerDetails.port}/cards`,
      body,
    );
    return responce.data;
  } catch (e: unknown) {
    let message = '';
    if (typeof e === 'string') {
      message = e;
    } else if (e instanceof Error) {
      message = e.message;
    }
    return new Error(message);
  }
}

export async function updateCardOrder(
  userId: string,
  boardId: string,
  data: {columnId: string, columnCards: string[]}[],
): Promise<IColumn | Error> {
  try {
    const body = {
      userId,
      boardId,
      data
    };
    const responce = await axios.post<IColumn>(
      `${ServerDetails.url}:${ServerDetails.port}/columns/update-card-order`,
      body,
    );
    return responce.data;
  } catch (e: unknown) {
    let message = '';
    if (typeof e === 'string') {
      message = e;
    } else if (e instanceof Error) {
      message = e.message;
    }
    return new Error(message);
  }
}

export async function updateColumnOrder(
  userId: string,
  boardId: string,
  data: string[],
): Promise<string[] | Error> {
  try {
    const body = {
      userId,
      boardId,
      data
    };
    const responce = await axios.post<string[]>(
      `${ServerDetails.url}:${ServerDetails.port}/columns/update-column-order`,
      body,
    );
    return responce.data;
  } catch (e: unknown) {
    let message = '';
    if (typeof e === 'string') {
      message = e;
    } else if (e instanceof Error) {
      message = e.message;
    }
    return new Error(message);
  }
}
