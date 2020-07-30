import Typography from 'typography';

const fonts = [
  'Fira Sans',
  'Roboto',
  'Helvetica Neue',
  'Segoe UI',
  'Helvetica',
  'Arial',
  'sans-serif',
];

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  bodyFontFamily: fonts,
  // bodyGray: 20,
  bodyWeight: 400,
  boldWeight: 700,
  headerFontFamily: fonts,
  // headerGray: 20,
  headerWeight: 700,
  overrideStyles: () => ({
    blockquote: {
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      paddingBottom: '1rem',
      paddingLeft: '2rem',
      paddingRight: '1rem',
      paddingTop: '1rem',
      marginBottom: '2rem',
      fontSize: '1.25rem',
      lineHeight: '2rem',
      background: 'hsla(0, 0%, 0%, 0.03)',
      color: 'hsla(0, 0%, 0%, 0.69)',
      /* border-left: 0.20833rem solid hsla(0, 0%, 0%, 0.2); */
      borderLeft: '0.25rem solid #a44fb6',
    },
  }),
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
