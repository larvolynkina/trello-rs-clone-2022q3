import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { APPRoute } from '../../const/const';
import { useCreateBoardMutation } from '../../store/reducers/workspace/workspace.api';
import { IWsBoard } from '../../types/workspace';
import './Boards.scss';

type BoardsProps = {
  data: IWsBoard[];
  workspaceId: string;
};

function Boards({ data, workspaceId }: BoardsProps) {
  const [createBoard, { isLoading }] = useCreateBoardMutation();

  const handleCreateBoard = async () => {
    try {
      const res = await createBoard({
        workspaceId,
        title: 'Test board',
      }).unwrap();
      toast.success('Доска успешно создана!');
    } catch (err) {
      //
    }
  };

  return (
    <div className="boards">
      {data.map(({ _id: id, title }) => (
        <Link to={`${APPRoute.board.replace(':boardId', id)}`} className="boards__board">
          <div className="boards__board-fade" />
          {title}
        </Link>
      ))}
      <button
        type="button"
        className="boards__board boards__board--button"
        disabled={isLoading}
        onClick={handleCreateBoard}
      >
        Создать доску
      </button>
    </div>
  );
}

export default Boards;
