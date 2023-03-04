import { useState, KeyboardEvent } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../hooks/redux';
import { useUpdateWorkspaceMutation } from '../../store/reducers/workspace/workspace.api';
import { updateWorkspaceTitle } from '../../store/reducers/board/boardState';

import './Title.scss';

type TitleProps = {
  title: string;
  workspaceId: string;
};

function Title({ title, workspaceId }: TitleProps) {
  const [value, setValue] = useState(title);

  const [updateWorkspace, { isLoading }] = useUpdateWorkspaceMutation();
  const dispatch = useAppDispatch();

  const handleTitleChange = async () => {
    if (!value.trim()) {
      setValue(title);
      return;
    }

    if (value.trim().length < 1) {
      toast.error('Минимальная длина поля 1 символ');
      return;
    }

    if (value.trim().length > 20) {
      toast.error('Максимальная длина поля 20 символов');
      return;
    }

    if (value !== title) {
      try {
        await updateWorkspace({
          workspaceId,
          title: value.trim(),
        }).unwrap();
        setValue(value.trim());
        dispatch(updateWorkspaceTitle({ workspaceId, title: value }));
      } catch {
        setValue(title);
        toast.error('Произошла ошибка при изменении заголовка!');
      }
    }
  };

  const handleEnterKeyDown = (evt: KeyboardEvent<HTMLInputElement>) =>
    evt.key === 'Enter' && handleTitleChange();

  return (
    <div className="ws-title">
      <input
        type="text"
        className="ws-title__input"
        onChange={(evt) => setValue(evt.target.value)}
        value={value}
        onBlur={handleTitleChange}
        onKeyDown={handleEnterKeyDown}
        disabled={isLoading}
      />
    </div>
  );
}

export default Title;
