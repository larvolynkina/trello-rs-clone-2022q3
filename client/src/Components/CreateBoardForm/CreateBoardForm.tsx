import { SubmitHandler, useForm } from 'react-hook-form';

import { BG_COLORS, BG_IMAGES } from '../../const/const';
import { useCreateBoardMutation } from '../../store/reducers/workspace/workspace.api';
import { showErrorToast, showLoadingToast, showSuccessToast } from '../../utils/toast';
import './CreateBoardForm.scss';

type NewBoard = {
  title: string;
  theme: string;
};

type CreateBoardFormProps = {
  workspaceId: string;
  onClose: () => void;
};

const DELIMITER = '↕';

function CreateBoardForm({ onClose, workspaceId }: CreateBoardFormProps) {
  const [createBoard, { isLoading }] = useCreateBoardMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewBoard>({
    defaultValues: {
      theme: `backgroundColor${DELIMITER}${BG_COLORS[0]}`,
    },
    mode: 'all',
  });

  const handleFormSubmit: SubmitHandler<NewBoard> = async (data, evt) => {
    evt?.preventDefault();
    const { theme, title } = data;
    const [name, value] = theme.split(DELIMITER);

    const toastId = showLoadingToast('Создание доски...');
    try {
      await createBoard({
        title,
        workspaceId,
        [name]: value,
      }).unwrap();
      showSuccessToast(toastId, 'Доска создана успешно!');
    } catch (err) {
      showErrorToast(toastId, err, 'Произошла ошибка при создании доски.');
    }
    onClose();
  };

  return (
    <form className="create-board-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <h3 className="create-board-form__title">Создание доски</h3>
      <h4 className="create-board-form__field-name">Название доски</h4>
      <label htmlFor="title" className="auth-form__label create-board-form__label">
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
          placeholder="Введите название доски"
        />
        {errors?.title && <p className="auth-form__input-error">{errors?.title?.message}</p>}
      </label>

      <h4 className="create-board-form__field-name">Фон доски</h4>

      <div className="create-board-form__bg">
        <div className="create-board-form__images">
          {BG_IMAGES.map((image, id) => {
            const inputID = `rbi-${id}`;
            const value = `backgroundImage${DELIMITER}url(${image})`;

            return (
              <label
                key={inputID}
                htmlFor={inputID}
                style={{ backgroundImage: `url(${image})` }}
                className="cb-bg-radio-button"
              >
                <input
                  type="radio"
                  id={inputID}
                  className="cb-bg-radio-button__input"
                  value={value}
                  {...register('theme')}
                />
                <span />
              </label>
            );
          })}
        </div>

        <div className="create-board-form__colors">
          {BG_COLORS.map((color, id) => {
            const inputID = `rbc-${id}`;
            const value = `backgroundColor${DELIMITER}${color}`;

            return (
              <label
                key={inputID}
                htmlFor={inputID}
                style={{ backgroundColor: color }}
                className="cb-color-radio-button"
              >
                <input
                  type="radio"
                  id={inputID}
                  className="cb-color-radio-button__input"
                  value={value}
                  {...register('theme')}
                />
                <span />
              </label>
            );
          })}
        </div>
      </div>

      <div className="create-workspace-form__controls">
        <button type="button" className="create-workspace-form__cancel-btn" onClick={onClose}>
          Отмена
        </button>

        <button type="submit" className="form-btn form-btn--small" disabled={!isValid || isLoading}>
          Создать
        </button>
      </div>
    </form>
  );
}

export default CreateBoardForm;
