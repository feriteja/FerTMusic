const color = {
  dark: [
    '#000000',
    '#0a0a0a',
    '#141414',
    '#1f1f1f',
    '#292929',
    '#333333',
    '#3d3d3d',
    '#474747',
    '#525252',
    '#5c5c5c',
    '#666666',
    '#707070',
    '#7a7a7a',
  ],
  white: [
    '#ffffff',
    '#f5f5f5',
    '#ebebeb',
    '#e0e0e0',
    '#d6d6d6',
    '#cccccc',
    '#c2c2c2',
    '#b8b8b8',
    '#adadad',
    '#a3a3a3',
    '#999999',
    '#8f8f8f',
    '#858585',
  ],
  red: [
    '#ff0000',
    '#ff1919',
    '#ff3232',
    '#ff4c4c',
    '#ff6666',
    '#ff7f7f',
    '#ff9999',
    '#ffb2b2',
    '#ffcccc',
    '#ffe5e5',
  ],
};

const themeDark = {
  backGround: color.dark[0],
  sideBar: color.dark[2],
  text: color.white[0],
  icon: color.white[1],
  iconContainerFocus: color.dark[5],
  card: color.dark[3],
  progressBar: color.red[7],
};

const themeLight = {
  backGround: color.white[0],
  sideBar: color.white[3],
  text: color.dark[0],
  icon: color.dark[1],
  iconContainerFocus: color.white[5],
};

export {themeDark, themeLight};
