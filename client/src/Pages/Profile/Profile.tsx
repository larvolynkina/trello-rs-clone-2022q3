import { useState } from 'react';

import Tabs, { Tab } from '../../Components/Tabs';
import ProfileForm from '../../Components/ProfileForm';
import './Profile.scss';

const tabs: Tab[] = [
  { id: 1, label: 'Профиль' },
  { id: 2, label: 'Действия' },
];

function Profile() {
  const [currentTab, setCurrentTab] = useState<number>(tabs[0].id);

  const handleTabClick = (id: number) => setCurrentTab(id);

  return (
    <main className="profile">
      <div className="profile__container">
        <Tabs
          tabs={tabs}
          currentId={currentTab}
          handleTabClick={handleTabClick}
          className="profile__tabs"
        />
        {tabs[0].id === currentTab && <ProfileForm />}
        {tabs[1].id === currentTab && <div>Действия</div>}
      </div>
    </main>
  );
}

export default Profile;
