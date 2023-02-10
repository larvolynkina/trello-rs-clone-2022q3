import UserNameForm from './UserNameForm';
import './ProfileForm.scss';

function ProfileForm() {
  return (
    <div className="profile-form">
      <div className="profile-form__wrapper">
        <h1 className="profile-form__title">Профиль пользователя</h1>

        <div>avatar</div>

        <hr className="profile-form__separator" />

        <UserNameForm />
      </div>
    </div>
  );
}

export default ProfileForm;
