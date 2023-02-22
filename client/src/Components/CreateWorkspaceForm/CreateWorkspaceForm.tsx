import { SubmitHandler, useForm } from 'react-hook-form';

import { useCreateWorkspaceMutation } from '../../store/reducers/workspace/workspace.api';
import { showErrorToast, showLoadingToast, showSuccessToast } from '../../utils/toast';
import './CreateWorkspaceForm.scss';

type NewWorkspace = {
  title: string;
  description?: string;
};

type CreateWorkspaceFormProps = {
  onClose: () => void;
};

function CreateWorkspaceForm({ onClose }: CreateWorkspaceFormProps) {
  const [createWorkspace, { isLoading }] = useCreateWorkspaceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewWorkspace>({
    mode: 'all',
  });

  const handleFormSubmit: SubmitHandler<NewWorkspace> = async (data, evt) => {
    evt?.preventDefault();
    const toastId = showLoadingToast('Создание рабочего пространства...');
    try {
      await createWorkspace({
        ...data,
        title: data.title.trim(),
      }).unwrap();
      showSuccessToast(toastId, 'Рабочее пространство создано успешно!');
      onClose();
    } catch (err) {
      showErrorToast(toastId, err, 'Произошла ошибка при создании рабочего пространства!');
    }
  };

  return (
    <form className="create-workspace-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <h3 className="create-workspace-form__title">Создание рабочего пространства</h3>
      <p className="create-workspace-form__description">
        Повысьте производительность: участники команды смогут получать удобный доступ ко всем
        доскам.
      </p>

      <h4 className="create-workspace-form__field-name">Название рабочего пространства</h4>
      <label htmlFor="title" className="auth-form__label create-workspace-form__label">
        <input
          className="auth-form__input"
          {...register('title', {
            required: 'Данное поле обязательно для заполнения',
            minLength: {
              value: 3,
              message: 'Минимальная длина поля 3 символа',
            },
          })}
          type="text"
          placeholder="Введите название раб. пространства"
        />
        {errors?.title && <p className="auth-form__input-error">{errors?.title?.message}</p>}
      </label>

      <h4 className="create-workspace-form__field-name">Описание рабочего пространства</h4>
      <label htmlFor="title" className="auth-form__label create-workspace-form__label">
        <textarea
          className="auth-form__input create-workspace-form__textarea"
          {...register('description')}
          placeholder="Необязательно для заполнения"
          rows={6}
        />
      </label>

      <div className="create-workspace-form__controls">
        <button type="button" className="create-workspace-form__cancel-btn" onClick={onClose}>
          Отмена
        </button>

        <button type="submit" className="form-btn form-btn--small" disabled={isLoading || !isValid}>
          Создать
        </button>
      </div>
    </form>
  );
}

export default CreateWorkspaceForm;
