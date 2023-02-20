import Boards from '../../../Components/Workcspace/Boards';
import WorkspaceIcon from '../../../Components/Workcspace/WorkspaceIcon';
import { IWorkspace } from '../../../types/workspace';
import './BoardAside.scss';

type BoardAsideProps = {
  workspace: IWorkspace;
};
function BoardAside({ workspace }: BoardAsideProps) {
  return (
    <div className="workspace-panel">
      <div className="workspace-panel__header">
        <WorkspaceIcon color={workspace.avatarColor} title={workspace.title} />
        <h3 className="workspace-panel__title">{workspace.title}</h3>
      </div>
      <div className="workspace-panel__boards">
        <Boards data={workspace.boards} workspaceId={workspace._id}  />
      </div>
    </div>
  );
}

export default BoardAside;
