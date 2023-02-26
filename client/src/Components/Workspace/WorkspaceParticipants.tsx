import classNames from 'classnames';
import { useState } from 'react';

import { IParticipant } from '../../types/workspace';
import AddParticipantsToWorkspace from '../AddParticipantsToWorkspace';
import Modal from '../Modal';
import UserAvatar from '../UserAvatar';
import './WorkspaceParticipants.scss';

type WorkspaceParticipantsProps = {
  workspaceId: string;
  participants: IParticipant[];
  className?: string;
};

function WorkspaceParticipants({
  workspaceId,
  participants,
  className = '',
}: WorkspaceParticipantsProps) {
  const [isModalOpen, setModalIsOpen] = useState(false);

  const onClose = () => setModalIsOpen(false);

  return (
    <div
      className={classNames('workspace-participants', {
        [className]: className,
      })}
    >
      {participants.map((participant) => (
        <UserAvatar key={participant._id} participant={participant} />
      ))}
      <button
        className="workspace-participants__add-btn"
        type="button"
        onClick={() => setModalIsOpen(true)}
      >
        +
      </button>

      <Modal isOpen={isModalOpen} onClose={onClose}>
        <AddParticipantsToWorkspace
          workspaceId={workspaceId}
          participants={participants}
          onClose={onClose}
        />
      </Modal>
    </div>
  );
}

WorkspaceParticipants.defaultProps = {
  className: '',
};

export default WorkspaceParticipants;
