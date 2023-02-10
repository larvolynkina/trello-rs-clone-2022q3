import UserNameForm from './UserNameForm';
import './ProfileForm.scss';
import ChangePasswordForm from './ChangePasswordForm';

function ProfileForm() {
  return (
    <div className="profile-form">
      <div className="profile-form__wrapper">
        <h1 className="profile-form__title">Профиль пользователя</h1>

        <div>avatar</div>

        <hr className="profile-form__separator" />

        <UserNameForm />

        <hr className="profile-form__separator" />

        <ChangePasswordForm />
      </div>
    </div>
  );
}

export default ProfileForm;
