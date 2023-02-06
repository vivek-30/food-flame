const Authentication = ({ title }) => {
  return (
    <div className="container authentication">
      <div className="container">
        <h4 className="center-align">{title}</h4>
        <form>
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input id="username" type="text" className="validate" />
            <label htmlFor="username">Enter Your UserName</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">vpn_key</i>
            <input id="password" type="password" className="validate" />
            <label htmlFor="password">Enter Your Password</label>
          </div>
          <div className="center-align">
            <button className="btn waves-effect waves-light darken-2" type="submit" name={title}>
              {title}
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Authentication;
