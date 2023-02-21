import { useState, KeyboardEvent } from 'react';
import { toast } from 'react-toastify';

import { useUpdateWorkspaceMutation } from '../../store/reducers/workspace/workspace.api';
import './Title.scss';

type TitleProps = {
  title: string;
  workspaceId: string;
};

function Title({ title, workspaceId }: TitleProps) {
  const [value, setValue] = useState(title);

  const [updateWorkspace, { isLoading }] = useUpdateWorkspaceMutation();

  const handleTitleChange = async () => {
    if (!value) {
      setValue(title);
      return;
    }

    if (value.length < 3) {
      toast.error('Минимальная длина поля 3 символа');
      return;
    }

    if (value !== title) {
      try {
        await updateWorkspace({
          workspaceId,
          title: value,
        }).unwrap();
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
