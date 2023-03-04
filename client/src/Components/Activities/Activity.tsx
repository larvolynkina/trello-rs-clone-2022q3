import { useEffect, useState } from 'react';
import { IActivity, IUser } from '../../types/card';
import UserAvatar from '../UserAvatar';
import './Activities.scss';

interface ActivityProps {
  activity: IActivity;
  users: IUser[];
}

function Activity({ activity, users }: ActivityProps) {
  const [user, setUser] = useState<IUser | undefined>();

  useEffect(() => {
    if (users.length > 0) {
      const currentUser = users.filter((person) => person._id === activity.userId)[0];
      setUser(currentUser);
    }
  }, [users]);

  return (
    <div className="activities__item">
      {user && <UserAvatar participant={user} />}
      <div className='activities__info'>
        <p className="activities__text">
          <span className="activities__user-name">{user?.userName}</span>{' '}
          {activity.action.split(' ').slice(1).join(' ')}
        </p>
        <p className="activities__data">{new Date(activity.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default Activity;
