import Button from "components/Button";
import Card from "components/card/Card";
import Input from "components/Form/Inpux";
import Link from "next/link";
import { useForm } from "react-hook-form";
import fetchJson from "utils/fetchJson";
import useUser from "utils/useUser";
import CenterLayout from "../../components/layout/CenterLayout";

const Register = () => {
  const { handleSubmit, control } = useForm();

  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const onSubmit = async (formData) => {
    await mutateUser(
      fetchJson("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
    );
    console.log(formData);
  };

  return (
    <CenterLayout>
      <Card className="w-96">
        <div className="text-center">
          <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" name="email" control={control} />
          <Input
            label="Password"
            name="password"
            control={control}
            type="password"
          />

          <Button type="submit" label="Register" />
        </form>
        <div className="text-center pt-2">
          <Link href="/auth/login">
            <a className="small">Login</a>
          </Link>
        </div>
      </Card>
    </CenterLayout>
  );
};

export default Register;

export async function getServerSideProps() {
  if (process.env.REGISTER_ENABLED !== "true") {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
