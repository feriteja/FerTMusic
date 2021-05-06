const color = {
  dark: [
    '#090909',
    '#191919',
    '#0f0f0f',
    '#1f1f1f',
    '#292929',
    '#2f2f2f',
    '#393939',
    '#3f3f3f',
    '#494949',
    '#4f4f4f',
  ],
  white: [
    '#fff',
    '#fefefe',
    '#fdfdfd',
    '#fcfcfc',
    '#fbfbfb',
    '#fafafa',
    '#f9f9f9',
    '#f8f8f8',
    '#f7f7f7',
    '#f6f6f6',
  ],
};

const themeDark = {
  backGround: color.dark[0],
  sideBar: color.dark[3],
  text: color.white[0],
  icon: color.white[1],
  iconContainerFocus: color.dark[5],
  card: color.dark[1],
};

const themeLight = {
  backGround: color.white[0],
  sideBar: color.white[3],
  text: color.dark[0],
  icon: color.dark[1],
  iconContainerFocus: color.white[5],
};

export {themeDark, themeLight};
