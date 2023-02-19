import { IWorkspace } from '../../types/workspace';
import WorkspaceIcon from './WorkspaceIcon';
import Boards from './Boards';
import Title from './Title';
import { useDeleteWorkspaceMutation } from '../../store/reducers/workspace/workspace.api';
import './Workspace.scss';
import { showErrorToast, showLoadingToast, showSuccessToast } from '../../utils/toast';

type WorkspaceProps = {
  data: IWorkspace;
};

function Workspace({ data: { title, avatarColor, boards, _id: id } }: WorkspaceProps) {
  const [deleteWorkspace, { isLoading }] = useDeleteWorkspaceMutation();

  const handleDeleteWorkspace = async () => {
    const toastId = showLoadingToast('Удаление рабочего пространства...');
    try {
      await deleteWorkspace(id).unwrap();
      showSuccessToast(toastId, 'Рабочее пространство удалено успешно!');
    } catch (err) {
      showErrorToast(toastId, err, 'Произошла ошибка при удалении рабочего пространства.');
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
