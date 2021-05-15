import Button from "components/Button";
import Card from "components/card/Card";
import Input from "components/Form/Inpux";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import fetcJson from "utils/fetchJson";
import useUser from "utils/useUser";
import CenterLayout from "../../components/layout/CenterLayout";

const Login = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const onSubmit = async (formData) => {
    await mutateUser(
      fetcJson("/api/auth/login", {
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
        <Card.Header>
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
          </div>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input label="Email" name="email" control={control} />
            <Input
              label="Password"
              name="password"
              control={control}
              type="password"
            />
            <Button type="submit" label="Login" />
          </form>
        </Card.Body>
        <Card.Footer>
          <div className="text-center pt-2">
            <Link href="/auth/register">
              <a className="small" href="/auth/register">
                Create an Account!
              </a>
            </Link>
          </div>
        </Card.Footer>
      </Card>
    </CenterLayout>
  );
};

export default Login;
