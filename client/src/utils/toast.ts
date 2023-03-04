import axios from 'axios';
import { toast } from 'react-toastify';
import { UNKNOWN_ERROR } from '../store/serviceActions';

import { ErrorMessage } from '../types/Error';
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

type showErrorToastProps = {
  id: Id;
  err?: unknown;
  fallbackMsg?: string;
};

export const showErrorToast = ({ id, fallbackMsg, err }: showErrorToastProps) => {
  const msg =
    (axios.isAxiosError<ErrorMessage>(err) && err.response?.data.message) ||
    (isFetchBaseQueryErrorWithMsg(err) && err.data.message) ||
    fallbackMsg ||
    UNKNOWN_ERROR;

  toast.update(id, {
    render: msg,
    type: 'error',
    isLoading: false,
    autoClose: AUTO_CLOSE_TIME,
  });
};
