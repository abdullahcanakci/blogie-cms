import withSession from "@utils/withSession";
import { connectToDatabase } from "utils/mongodb";
import { hashPassword } from "utils/password";

export default withSession(async (req, res) => {
  const { email, password } = await req.body;

  const { db } = await connectToDatabase();

  if (email == null || email == "" || password == "" || password == null) {
    res.status(422).json({ errors: { general: ["Wrong credentials"] } });
  }

  const hash = await hashPassword(password);

  const user = await db
    .collection("users")
    .insertOne({ email: email, password: hash });

  try {
    // we check that the user exists on GitHub and store some data in session
    const user = { isLoggedIn: true, email };
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
