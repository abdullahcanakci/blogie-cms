import withSession from "@utils/withSession";

export default function CmsPage({ user }) {
  return (
    <div>
      Cms
      {user.email}
    </div>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  console.log(user);

  if (!user) {
    return {
      redirect: {
        destination: "/cms/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
});
