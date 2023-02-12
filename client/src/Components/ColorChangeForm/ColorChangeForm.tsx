import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserAvatarAction } from '../../store/serviceActions';
import UserAvatar from '../UserAvatar';
import './ColorChangeForm.scss';

const groupName = 'colors';
const colors = ['#0052cc', '#00a3bf', '#00875a', '#ff991f', '#de350b', '#5243aa', '#172b4d'];

type ColorsData = {
  colors: string;
};

type ColorChangeFormProps = {
  onClose: () => void;
};

function ColorChangeForm({ onClose }: ColorChangeFormProps) {
  const { userData } = useAppSelector((state) => state.USER);

  if (!userData) return null;

  const dispatch = useAppDispatch();

  const { register, handleSubmit, watch } = useForm<ColorsData>({
    defaultValues: {
      colors: userData?.avatarColor || '#0052cc',
    },
  });

  const handleFormSubmit: SubmitHandler<ColorsData> = (data, evt) => {
    evt?.preventDefault();
    dispatch(
      updateUserAvatarAction({
        avatarColor: data.colors,
        avatarImage: '',
      }),
    );

    onClose();
  };

  return (
    <form className="color-change-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <h2 className="color-change-form__title">Изменение цвета аватара</h2>

      <div className="color-change-form__wrapper">
        <UserAvatar
          participant={{
            ...userData,
            avatarColor: watch(groupName),
          }}
          className="user-info__avatar"
        />

        <div className="color-change-form__colors-wrapper">
          <h3 className="color-change-form__section-title">Выберите цвет автара</h3>

          <div className="color-change-form__colors">
            {colors.map((color, id) => {
              const inputID = `rb-${id}`;
              return (
                <label
                  key={inputID}
                  htmlFor={inputID}
                  style={{ backgroundColor: color }}
                  className="color-radio-button"
                >
                  <input
                    type="radio"
                    id={inputID}
                    className="color-radio-button__input"
                    value={color}
                    {...register(groupName)}
                  />
                  <span />
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <p className="color-change-form__description">
        Это изображение заменяет текущую фотографию профиля. Его будут видеть только пользователи,
        имеющие право просматривать изображение вашего профиля.
      </p>

      <div className="color-change-form__controls">
        <button type="button" className="color-change-form__cancel-btn" onClick={onClose}>
          Отмена
        </button>
        <button className="form-btn form-btn--small" type="submit">
          Обновить
        </button>
      </div>
    </form>
  );
}

export default ColorChangeForm;
