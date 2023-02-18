import { IWorkspace } from '../../types/workspace';
import WorkspaceIcon from './WorkspaceIcon';
import Boards from './Boards';
import './Workspace.scss';
import Title from './Title';

type WorkspaceProps = {
  data: IWorkspace;
};

function Workspace({ data: { title, avatarColor, boards, _id: id } }: WorkspaceProps) {
  return (
    <div className="workspace">
      <div className="workspace__header">
        <WorkspaceIcon title={title} color={avatarColor} />
        <Title title={title} workspaceId={id} />
      </div>
      <Boards data={boards} workspaceId={id} />
    </div>
  );
}

export default Workspace;
