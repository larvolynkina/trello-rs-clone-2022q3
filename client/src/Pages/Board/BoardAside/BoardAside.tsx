import { IWorkspace } from '../../../types/workspace';
import './BoardAside.scss';

type BoardAsideProps = {
  workspace: IWorkspace;
}
function BoardAside({ workspace }: BoardAsideProps) {
  return (
    <div>
      <h3>{workspace.title}</h3>
      <div />
    </div>
  );
}

export default BoardAside;
