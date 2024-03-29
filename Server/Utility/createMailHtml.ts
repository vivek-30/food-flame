const createMailHtml = (token: string, username: string): string => {
  const redirectURL = `https://foodflame.netlify.app/verify?_token=${token}`;
  
  return (`
    <div
      style="background: #eceff1;
      padding: 2rem;
    ">
      <h2
        style="color: #37474f;
        text-align: center;
      ">
        Welcome ${username}, verify your email account to start enjoying your FoodFlame Recipes 🍽.
      </h2>
      <a
        href="${redirectURL}"
        target="_blank"
        style="display: block;
        background-color: #009688;
        text-decoration: none;
        color: #fff;
        border-radius: 5px;
        padding: 1rem;
        font-size: 18px;
        font-weight: 600;
        width: 7.8rem;
        margin: 1.5rem auto;
      ">
        Click To Verify
      </a>
    </div>
  `);
}

export default createMailHtml;
