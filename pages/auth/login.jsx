import Card from "components/card/Card";
import { useForm } from "react-hook-form";
import fetcJson from "utils/fetchJson";
import useUser from "utils/useUser";
import CenterLayout from "../../components/layout/CenterLayout";

const Login = () => {
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
                <div className="form-group">
                  <div className="custom-control custom-checkbox small">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck"
                    />
                    <label className="custom-control-label" for="customCheck">
                      Remember Me
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-user btn-block"
                >
                  Login
                </button>
              </form>
              <hr />
              <div className="text-center">
                <a className="small" href="forgot-password.html">
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <a className="small" href="register.html">
                  Create an Account!
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </CenterLayout>
  );
};

export default Login;
