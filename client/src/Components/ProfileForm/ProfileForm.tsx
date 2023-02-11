import UserNameForm from './UserNameForm';
import ChangePasswordForm from './ChangePasswordForm';
import UserInfo from './UserInfo';
import './ProfileForm.scss';

function ProfileForm() {
  return (
    <div className="profile-form">
      <div className="profile-form__wrapper">
        <h1 className="profile-form__title">Профиль пользователя</h1>

        <div>
          <UserInfo />
        </div>

        <hr className="profile-form__separator" />

        <UserNameForm />

        <hr className="profile-form__separator" />

        <ChangePasswordForm />
      </div>
    </div>
  );
}

export default ProfileForm;
