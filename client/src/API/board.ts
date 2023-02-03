import axios from 'axios';
import { ServerDetails } from '../const/const';
import { IColumnTest } from '../types/board';

export function getAllBoard() {
  throw new Error('empty function');
}

export async function getColumns(boardId: string): Promise<IColumnTest[] | Error> {
  if (boardId) {
    console.log('boardID:', boardId);
  }
  const tempBoardId = '63dc9efe0257d54a15c2c628';
  try {
    const responce = await axios.get<IColumnTest[]>(
      `${ServerDetails.url}:${ServerDetails.port}/columns/${tempBoardId}`,
    );
    return responce.data;
  } catch (e: unknown) {
    let message = '';
    if (typeof e === 'string') {
      console.error('error fetching columns: ', e);
      message = e;
    } else if (e instanceof Error) {
      console.error('error fetching columns: ', e.message)
      message = e.message;
    }
    return new Error(message);
  }
}
