function chooseRandomColor() {
  const colorsArray = ['#0052cc', '#00a3bf', '#00875a', '#ff991f', '#de350b', '#5243aa', '#172b4d'];
  const min = 0;
  const max = colorsArray.length - 1;
  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomColor = colorsArray[randomIndex];
  return randomColor;
}

const defaultMarks = [
  {
    color: '#7bc86c',
    text: '',
    checked: false,
  },
  {
    color: '#f5dd29',
    text: '',
    checked: false,
  },
  {
    color: '#ffaf3f',
    text: '',
    checked: false,
  },
  {
    color: '#ef7564',
    text: '',
    checked: false,
  },
  {
    color: '#cd8de5',
    text: '',
    checked: false,
  },
  {
    color: '#5ba4cf',
    text: '',
    checked: false,
  },
];

export { chooseRandomColor, defaultMarks };
