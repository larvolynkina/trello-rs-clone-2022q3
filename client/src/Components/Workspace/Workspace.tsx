import { toast } from 'react-toastify';

import { IWorkspace } from '../../types/workspace';
import WorkspaceIcon from './WorkspaceIcon';
import Boards from './Boards';
import Title from './Title';
import { useDeleteWorkspaceMutation } from '../../store/reducers/workspace/workspace.api';
import { isFetchBaseQueryErrorWithMsg } from '../../utils/error';
import './Workspace.scss';

type WorkspaceProps = {
  data: IWorkspace;
};

function Workspace({ data: { title, avatarColor, boards, _id: id } }: WorkspaceProps) {
  const [deleteWorkspace, { isLoading }] = useDeleteWorkspaceMutation();

  const handleDeleteWorkspace = async () => {
    const toastId = toast.loading('Удаление рабочего пространства...');
    try {
      await deleteWorkspace(id).unwrap();
      toast.update(toastId, {
        render: 'Рабочее пространство удалено успешно!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      if (isFetchBaseQueryErrorWithMsg(err)) {
        toast.update(toastId, {
          render: err.data.message,
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: 'Произошла ошибка при удалении рабочего пространства.',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="workspace">
      <div className="workspace__header">
        <WorkspaceIcon title={title} color={avatarColor} />
        <Title title={title} workspaceId={id} />
        <button
          type="button"
          className="workspace__btn"
          disabled={isLoading}
          onClick={handleDeleteWorkspace}
        >
          Удалить
        </button>
      </div>
      <Boards data={boards} workspaceId={id} />
    </div>
  );
}

export default Workspace;
