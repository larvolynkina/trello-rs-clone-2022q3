import { useGetAllWorkspacesQuery } from '../../store/reducers/workspace/workspace.api';
import './Workspaces.scss';

function Workspaces() {
  const { data = [] } = useGetAllWorkspacesQuery();

  return (
    <main className="workspaces">
      <div className="workspaces__container">
        {data.map((item) => (
          <p>{JSON.stringify(item.title)}</p>
        ))}
      </div>
    </main>
  );
}

export default Workspaces;
