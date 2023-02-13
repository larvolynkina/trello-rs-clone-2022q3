import classNames from 'classnames';

import { IUser } from '../../types/card';
import './UserAvatar.scss';

interface UserAvatarProps {
  participant: IUser;
  className?: string;
}

function UserAvatar({ participant, className = '' }: UserAvatarProps) {
  const userAvatarClassNames = classNames('user-avatar', {
    [className]: className,
  });

  return participant.avatarImage ? (
    <div
      className={userAvatarClassNames}
      style={{ backgroundImage: `url(${participant.avatarImage})` }}
    />
  ) : (
    <div className={userAvatarClassNames} style={{ backgroundColor: `${participant.avatarColor}` }}>
      {participant.userName[0].toUpperCase()}
    </div>
  );
}

UserAvatar.defaultProps = {
  className: '',
};

export default UserAvatar;
