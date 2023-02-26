import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeAvatarImageAction } from '../../store/serviceActions';
import UserAvatar from '../UserAvatar';
import './ImageChangeForm.scss';

const FILE_EXTENSIONS = 'image/gif,image/jpeg,image/png';

const MAX_FILE_SIZE = 512000; // 500kb

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
    formState: { isValid, errors },
  } = useForm<FileData>({
    mode: 'all',
  });

  const fileInput = useRef<HTMLInputElement | null>(null);
  const { userData, isLoading } = useAppSelector((state) => state.USER);

  if (!userData) return null;

  const dispatch = useAppDispatch();

  const { ref, ...rest } = register('files', {
    required: 'Выберите файл.',
    validate: (files) => files[0]?.size < MAX_FILE_SIZE || 'Максимальный размер файла 500kb',
  });

  const getUrl = (data: FileList) => {
    const file = data?.[0];
    if (!(file instanceof File)) return null;
    return URL.createObjectURL(file);
  };

  const handleImageUpdate: SubmitHandler<FileData> = async (data, evt) => {
    evt?.preventDefault();
    const file = data.files[0];
    if (file) await dispatch(changeAvatarImageAction(file));
    onClose();
  };

  return (
    <form className="image-change-form" onSubmit={handleSubmit(handleImageUpdate)}>
      <h2 className="image-change-form__title">Изменение изображения аватара</h2>
      <UserAvatar
        participant={{ ...userData, avatarImage: getUrl(watch('files')) || userData.avatarImage }}
        className="image-change-form__avatar"
      />
      <p className="auth-form__input-error">{errors?.files?.message}</p>
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
        <button className="form-btn form-btn--small" type="submit" disabled={!isValid || isLoading}>
          Обновить
        </button>
      </div>
    </form>
  );
}

export default ImageChangeForm;
