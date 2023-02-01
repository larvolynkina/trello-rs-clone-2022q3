function chooseRandomColor() {
  const colorsArray = ['#0052cc', '#00a3bf', '#00875a', '#ff991f', '#de350b', '#5243aa', '#172b4d'];
  const min = 0;
  const max = colorsArray.length - 1;
  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomColor = colorsArray[randomIndex];
  return randomColor;
}

export default chooseRandomColor;
