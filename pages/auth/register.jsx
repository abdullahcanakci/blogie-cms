import Card from "components/card/Card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import fetchJson from "utils/fetchJson";
import useUser from "utils/useUser";
import CenterLayout from "../../components/layout/CenterLayout";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
      <Card className="col-md-7">
        <div className="row">
          <div className="col-lg-12">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-user"
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email Address..."
                    {...register("email")}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-user"
                    id="exampleInputPassword"
                    placeholder="Password"
                    {...register("password")}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-user btn-block"
                >
                  Register
                </button>
              </form>
              <hr />
              <div className="text-center">
                <Link href="/auth/login">
                  <a className="small">Login</a>
                </Link>
              </div>
            </div>
          </div>
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
