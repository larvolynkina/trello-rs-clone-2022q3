import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeAvatarImageAction } from '../../store/serviceActions';
import UserAvatar from '../UserAvatar';
import './ImageChangeForm.scss';

const FILE_EXTENSIONS = 'image/gif,image/jpeg,image/png';

type FileData = {
  files: FileList;
};

type ImageChangeFormProps = {
  onClose: () => void;
};

function ImageChangeForm({ onClose }: ImageChangeFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FileData>();

  const fileInput = useRef<HTMLInputElement | null>(null);
  const { userData } = useAppSelector((state) => state.USER);

  if (!userData) return null;

  const dispatch = useAppDispatch();

  const { ref, ...rest } = register('files', {
    required: true,
  });

  const getUrl = (data: FileList) => {
    const file = data?.[0];
    if (!(file instanceof File)) return null;
    return URL.createObjectURL(file);
  };

  const handleImageUpdate: SubmitHandler<FileData> = (data, evt) => {
    evt?.preventDefault();
    const file = data.files[0];
    if (file) dispatch(changeAvatarImageAction(file));
    onClose();
  };

  return (
    <form className="image-change-form" onSubmit={handleSubmit(handleImageUpdate)}>
      <h2 className="image-change-form__title">Изменение изображения аватара</h2>
      <UserAvatar
        participant={{ ...userData, avatarImage: getUrl(watch('files')) || userData.avatarImage }}
        className="image-change-form__avatar"
      />
      <input
        className="image-change-form__input"
        type="file"
        accept={FILE_EXTENSIONS}
        ref={(evt) => {
          ref(evt);
          fileInput.current = evt;
        }}
        {...rest}
      />

      <button
        type="button"
        className="form-btn form-btn--small"
        onClick={() => fileInput.current?.click()}
      >
        Загрузить изображение
      </button>

      <p className="image-change-form__description">
        Это изображение заменяет текущую фотографию профиля. Его будут видеть только пользователи,
        имеющие право просматривать изображение вашего профиля.
      </p>

      <div className="image-change-form__controls">
        <button type="button" className="image-change-form__cancel-btn" onClick={onClose}>
          Отмена
        </button>
        <button className="form-btn form-btn--small" type="submit" disabled={!isValid}>
          Обновить
        </button>
      </div>
    </form>
  );
}

export default ImageChangeForm;