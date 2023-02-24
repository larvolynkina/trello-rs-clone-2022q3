import { useState, ChangeEvent } from 'react';

import './AddParticipantsToWorkspace.scss';

const isValidEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

function AddParticipantsToWorkspace() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => setEmail(evt.target.value);

  return (
    <div className="add-participants-ws">
      <h3 className="add-participants-ws__title">Добавить участника</h3>
      <div className="add-participants-ws__input-wrapper">
        <input
          className="auth-form__input add-participants-ws__email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Адрес электронной почты"
        />
        <button className="form-btn form-btn--small" type="button">
          Найти
        </button>
      </div>

      <div className="add-participants-ws__controls">
        <button type="button" className="add-participants-ws__cancel-btn">
          Отмена
        </button>

        <button type="submit" className="form-btn form-btn--small">
          Создать
        </button>
      </div>
    </div>
  );
}

export default AddParticipantsToWorkspace;
