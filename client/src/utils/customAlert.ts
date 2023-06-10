import M from 'materialize-css';

const customAlert = (message: string): void => {
  M.toast({
    html: message,
    inDuration: 800,
    outDuration: 800,
    displayLength: 5000,
    classes: 'rounded grey lighten-5 blue-grey-text text-darken-4'
  });
}

export default customAlert;
