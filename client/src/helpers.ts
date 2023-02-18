function debounce(fn: (flag: boolean) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;

  return (flag: boolean) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(flag), delay);
  };
}

export default debounce;
