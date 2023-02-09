import { IUser } from '../../../types/card';

interface AvatarProps {
  participant: IUser;
}

function Avatar({ participant }: AvatarProps) {
  return participant.avatarImage ? (
    <div className="card__avatar" style={{ backgroundImage: `url(${participant.avatarImage})` }} />
  ) : (
    <div className="card__avatar" style={{ backgroundColor: `${participant.avatarColor}` }}>
      {participant.userName[0].toUpperCase()}
    </div>
  );
}

export default Avatar;
