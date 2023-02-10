import { IUser } from '../../types/card';
import './UserAvatar.scss';

interface UserAvatarProps {
  participant: IUser;
}

function UserAvatar({ participant }: UserAvatarProps) {
  return participant.avatarImage ? (
    <div className="user-avatar" style={{ backgroundImage: `url(${participant.avatarImage})` }} />
  ) : (
    <div className="user-avatar" style={{ backgroundColor: `${participant.avatarColor}` }}>
      {participant.userName[0].toUpperCase()}
    </div>
  );
}

export default UserAvatar;
