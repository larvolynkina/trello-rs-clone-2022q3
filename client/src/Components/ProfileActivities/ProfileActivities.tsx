import { useMemo } from 'react';

import { useAppSelector } from '../../hooks/redux';
import { useGetAllWorkspacesQuery } from '../../store/reducers/workspace/workspace.api';
import ActivitiesList from '../Activities';
import './ProfileActivities.scss';

function ProfileActivities() {
  const { userData } = useAppSelector((state) => state.USER);
  const { data = [] } = useGetAllWorkspacesQuery();

  if (!userData) return null;

  const activities = useMemo(
    () =>
      data
        .map((activity) =>
          activity.boards.map((board) =>
            board.activities.filter((boardActivity) => boardActivity.userId === userData._id),
          ),
        )
        .flat(2)
        .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()),
    [data],
  );

  return (
    <div className="profile-activities">
      <ActivitiesList activities={activities} />
    </div>
  );
}

export default ProfileActivities;
