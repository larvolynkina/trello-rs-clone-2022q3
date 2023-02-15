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
  const [updateWorkspace, { isLoading }] = useUpdateWorkspaceMutation();

  const handleCreateBoard = async () => {
    try {
      const res = await updateWorkspace({
        workspaceId: '63e495a4d6e7e6db24333570',
        title: 'First workspace',
      }).unwrap();
      //  console.log(res);
    } catch (err) {
      //  console.log(err);
    }
  };

  return (
    <main className="workspaces">
      <div className="workspaces__container">
        {data.map((item) => (
          <p key={item._id}>{item._id}</p>
        ))}

        <button type="button" disabled={isLoading} onClick={handleCreateBoard}>
          Create Board
        </button>
      </div>
    </main>
  );
}

export default Workspaces;
