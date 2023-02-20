import { toast } from 'react-toastify';

import { isFetchBaseQueryErrorWithMsg } from './error';

type Id = ReturnType<typeof toast.loading>;

const AUTO_CLOSE_TIME = 3000;

export const showLoadingToast = (msg: string): Id => toast.loading(msg);

export const showSuccessToast = (id: Id, msg: string) =>
  toast.update(id, {
    render: msg,
    type: 'success',
    isLoading: false,
    autoClose: AUTO_CLOSE_TIME,
  });

export const showErrorToast = (id: Id, err: unknown, fallbackMsg: string) => {
  const msg = (isFetchBaseQueryErrorWithMsg(err) && err.data.message) || fallbackMsg;
  toast.update(id, {
    render: msg,
    type: 'error',
    isLoading: false,
    autoClose: AUTO_CLOSE_TIME,
  });
};
