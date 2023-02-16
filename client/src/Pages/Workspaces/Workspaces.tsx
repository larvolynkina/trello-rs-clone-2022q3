import { Link } from 'react-router-dom';
import Workspace from '../../Components/Workcspace';
import { APPRoute } from '../../const/const';
import {
  useGetAllWorkspacesQuery,
  useCreateWorkspaceMutation,
  useCreateBoardMutation,
  useDeleteWorkspaceMutation,
  useUpdateWorkspaceMutation,
} from '../../store/reducers/workspace/workspace.api';
import './Workspaces.scss';

function Workspaces() {
  const { data = [] } = useGetAllWorkspacesQuery();
  // const [createBoard, { isLoading }] = useCreateBoardMutation();
  // const [createWorkspace, { isLoading }] = useCreateWorkspaceMutation();
  // const [deleteWorkspace, { isLoading }] = useDeleteWorkspaceMutation();
  // const [updateWorkspace, { isLoading }] = useUpdateWorkspaceMutation();

  return (
    <main className="workspaces">
      <div className="workspaces__container">
        <h1 className="workspaces__title">Ваши рабочие пространства</h1>
        {data.map((ws) => (
          <Workspace data={ws} />
        ))}
      </div>
    </main>
  );
}

export default Workspaces;
