import { DefaultTheme } from 'react-native-paper';

const info = {
  color: 'white',
};

const placeholder = {
  color: 'gray',
};

const link = {
  color: '#cc2b5e',
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#588326',
  },
  info: {
    icon: {
      ...info,
      fontSize: 24,
    },
    big: {
      ...info,
      fontSize: 20,
    },
    small: {
      ...info,
      fontSize: 12,
    },
  },
  placeholder: {
    icon: {
      ...placeholder,
      fontSize: 20,
    },
    regular: {
      ...placeholder,
      fontSize: 16,
    },
  },
  text: {
    icon: {
      fontSize: 20,
    },
    regular: {
      fontSize: 16,
    },
    small: {
      fontSize: 12,
    },
    card: {
      textAlign: 'center' as 'center',
      fontWeight: 'bold' as 'bold',
      width: '90%' as '90%',
    },
  },
  link: {
    icon: {
      ...link,
      fontSize: 24,
    },
  },
  section: {
    fontSize: 24,
    fontWeight: 'bold' as 'bold',
    marginBottom: 10,
  },
  screenContainer: {
    padding: 10,
  },
  container: {
    flex: 1,
  },
  contentCentered: {
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  rowSeparatorHorizontal: {
    width: 10,
  },
  rowSeparatorVertical: {
    height: 10,
  },
  columnSeparator: {
    justifyContent: 'space-between' as 'space-between',
  },
  lineSeparator: {
    borderBottomColor: placeholder.color,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  button: {
    small: {
      backgroundColor: link.color,
      width: 120,
      height: 30,
      borderRadius: 20,
    },
    smallText: {
      color: 'white',
      fontWeight: 'bold' as 'bold',
      fontSize: 12,
    },
  },
};

export default theme;
