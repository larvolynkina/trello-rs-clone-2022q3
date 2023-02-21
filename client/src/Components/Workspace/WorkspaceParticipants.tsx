import classNames from 'classnames';

import { IParticipant } from '../../types/workspace';
import UserAvatar from '../UserAvatar';
import './WorkspaceParticipants.scss';

type WorkspaceParticipantsProps = {
  participants: IParticipant[];
  className?: string;
};

function WorkspaceParticipants({ participants, className = '' }: WorkspaceParticipantsProps) {
  return (
    <div
      className={classNames('workspace-participants', {
        [className]: className,
      })}
    >
      {participants.map((participant) => (
        <UserAvatar participant={participant} />
      ))}
      <button className="workspace-participants__add-btn" type="button">
        +
      </button>
    </div>
  );
}

WorkspaceParticipants.defaultProps = {
  className: '',
};

export default WorkspaceParticipants;
