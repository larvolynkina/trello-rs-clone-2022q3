function debounce(fn: (arg: boolean | string[]) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (arg: boolean | string[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(arg), delay);
  };
}

export default debounce;
