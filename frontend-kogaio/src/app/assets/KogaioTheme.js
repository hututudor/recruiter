const theme = {
  colors: {
    'time-button': {
      normal: '#3d3d3d',
      selected: '#306b98'
    },
    'table': {
      'head': {
        'text-color': '#bbc0c4'
      },
      'body': {
        'button': '#608daf'
      },
      'i': '#eff0f1',
      'f': '#dee0e3',
    },
  },
  colorStyles: {
    'button-default-active': {
      background: '#306b98',
      '&:hover': {
        background: '#306b98'
      }
    },
    'button-default': {
      background: '#dee0e3',
      color: 'black',
      '&:hover': {
        background: '#dee0e3'
      }
    },
    'outline-button': {
      background: 'transparent',
      color: 'black',
      border: '1px solid black !important',
      '&:hover': {
        background: '#dee0e3'
      }
    },
    'simple-button': {
      background: 'transparent',
      color: '#306b98',
      'box-shadow': 'none',
      '&:hover': {
        background: '#dee0e3'
      }
    },
    'basic-button': {
      background: 'transparent',
      color: '#306b98',
      'box-shadow': 'none',
      '&:hover': {
        background: 'transparent'
      }
    },
    'basic-destructive-button': {
      background: 'transparent',
      color: 'red',
      'box-shadow': 'none',
      '&:hover': {
        background: 'transparent'
      }
    },
    'button-action': {
      background: 'black',
      color: '#f3f3f3',
      '&:hover': {
        background: 'black'
      }
    }
  }
};

export default theme;