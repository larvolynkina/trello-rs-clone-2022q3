import { useState, useEffect } from 'react';
import { IActivity } from '../../types/card';
import Activity from './Activity';
import { useGetAllUsersQuery } from '../../store/reducers/cards/cards.api';
import Loader from '../Loader';

interface ActivitiesListProps {
  activities: IActivity[];
}

function ActivitiesList({ activities }: ActivitiesListProps) {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [count, setCount] = useState(5);
  const [buttonText, setButtonText] = useState('');
  const [showMoreBtnHidden, setShowMoreBtnHidden] = useState(true);
  const [headerButtonText, setHeaderButtonText] = useState('Скрыть');
  const [showActivities, setShowActivities] = useState(true);

  function onShowMoreButtonClickHandler() {
    if (buttonText === 'Показать больше') {
      if (count + 5 > activities.length) {
        setCount(activities.length);
      } else {
        setCount((prev) => prev + 5);
      }
    }
    if (buttonText === 'Свернуть') {
      setCount(5);
    }
  }

  function onHideButtonClickHandler() {
    if (headerButtonText === 'Скрыть') {
      setShowActivities(false);
      setHeaderButtonText('Показать');
    }
    if (headerButtonText === 'Показать') {
      setShowActivities(true);
      setHeaderButtonText('Скрыть');
    }
  }

  useEffect(() => {
    if (activities.length > 5) {
      setShowMoreBtnHidden(false);
      setButtonText('Показать больше');
    }
    if (count === activities.length) {
      setButtonText('Свернуть');
      setShowMoreBtnHidden(false);
    }
    if (activities.length <= 5) {
      setShowMoreBtnHidden(true);
    }
  }, [activities, count]);

  return (
    <div className="activities">
      {isLoading && <Loader />}
      <div className="activities__header">
        <h3>Действия</h3>
        <button className="activities__btn" type="button" onClick={onHideButtonClickHandler}>
          {headerButtonText}
        </button>
      </div>
      <span className="activities__icon" />
      {showActivities && (
        <>
          <div className="activities__list">
            {activities.slice(0, count).map((item) => (
              <Activity activity={item} key={item._id} users={users || []} />
            ))}
          </div>
          <button
            hidden={showMoreBtnHidden}
            className="activities__btn"
            type="button"
            onClick={onShowMoreButtonClickHandler}
          >
            {buttonText}
          </button>
        </>
      )}
    </div>
  );
}

export default ActivitiesList;
