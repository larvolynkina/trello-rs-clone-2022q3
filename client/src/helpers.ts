function debounce(fn: (arg1: boolean, arg2: number) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (arg1: boolean, arg2: number) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(arg1, arg2), delay);
  };
}

export default debounce;
