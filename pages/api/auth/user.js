//github.com/vercel/next.js/blob/canary/examples/with-iron-session/pages/api/user.js

import withSession from "@utils/withSession";

export default withSession(async (req, res) => {
  const user = req.session.get("user");

  if (user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      isLoggedIn: true,
      ...user,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
