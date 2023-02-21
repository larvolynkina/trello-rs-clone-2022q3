import { IWorkspace } from '../../types/workspace';
import WorkspaceIcon from './WorkspaceIcon';
import Boards from './Boards';
import Title from './Title';
import WorkspaceParticipants from './WorkspaceParticipants';
import {
  useDeleteWorkspaceMutation,
  useLeaveWorkspaceMutation,
} from '../../store/reducers/workspace/workspace.api';
import { showErrorToast, showLoadingToast, showSuccessToast } from '../../utils/toast';
import { useAppSelector } from '../../hooks/redux';
import './Workspace.scss';

type WorkspaceProps = {
  data: IWorkspace;
};

function Workspace({
  data: { title, avatarColor, boards, _id: id, owner, participants },
}: WorkspaceProps) {
  const [deleteWorkspace, { isLoading: deletionInProgress }] = useDeleteWorkspaceMutation();
  const [leaveWorkspace, { isLoading: leavingInProgress }] = useLeaveWorkspaceMutation();
  const { userData } = useAppSelector((state) => state.USER);

  if (!userData) return null;

  const { _id: userId } = userData;

  const handleDeleteWorkspace = async () => {
    const toastId = showLoadingToast('Удаление рабочего пространства...');
    try {
      const { message } = await deleteWorkspace(id).unwrap();
      showSuccessToast(toastId, message);
    } catch (err) {
      showErrorToast(toastId, err, 'Произошла ошибка при удалении рабочего пространства.');
    }
  };

  const handleLeaveWorkspace = async () => {
    const toastId = showLoadingToast('Вы покидаете рабочее пространство...');
    try {
      const { message } = await leaveWorkspace({ workspaceId: id }).unwrap();
      showSuccessToast(toastId, message);
    } catch (err) {
      showErrorToast(toastId, err, 'Произошла ошибка в процессе покидания рабочего пространства!');
    }
  };

  const handleDeleteLeaveButtonClick = () =>
    userId === owner ? handleDeleteWorkspace() : handleLeaveWorkspace();

  return (
    <div className="workspace">
      <div className="workspace__header">
        <WorkspaceIcon title={title} color={avatarColor} />
        <Title title={title} workspaceId={id} />
        <button
          type="button"
          className="workspace__btn"
          disabled={deletionInProgress || leavingInProgress}
          onClick={handleDeleteLeaveButtonClick}
        >
          {userId === owner ? 'Удалить' : 'Покинуть'}
        </button>
        <WorkspaceParticipants participants={participants} className="workspace__participants" />
      </div>
      <Boards data={boards} workspaceId={id} />
    </div>
  );
}

export default Workspace;
