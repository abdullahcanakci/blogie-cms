import withSession from "@utils/withSession";
import { connectToDatabase } from "utils/mongodb";
import { checkPassword, hashPassword } from "utils/password";

export default withSession(async (req, res) => {
  const { email, password } = await req.body;

  const { db } = await connectToDatabase();

  if (email == null || email == "" || password == "" || password == null) {
    res.status(422).json({ errors: { general: ["Wrong credentials"] } });
    return;
  }

  const user = await db.collection("users").findOne({ email: email });

  if (!user) {
    res.status(422).json({ errors: { general: ["Wrong credentials"] } });
    return;
  }

  const valid = await checkPassword(user.password, password);

  if (!valid) {
    res.status(403).json({ errors: { general: ["Wrong credentials"] } });
    return;
  }

  try {
    const userData = { isLoggedIn: true, email: user.email };
    req.session.set("user", userData);
    await req.session.save();
    res.json(userData);
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
