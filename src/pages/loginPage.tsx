import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthService } from "../Auth/AuthService";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
interface FormStateType {
  username: string;
  password: string;
  email?: string;
}
type HandleChange = (e: ChangeEvent<HTMLInputElement>) => void;
type HandleSubmit = (e: FormEvent<HTMLFormElement>) => void;

export function LoginPage(): ReactElement {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormStateType>({
    username: "",
    password: "",
  });
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange: HandleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit: HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formState.email) {
      try {
        const loginResult = await AuthService.login(
          formState.username,
          formState.password
        );
        navigate("/calendar");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const signUpResult: string = await AuthService.signUp({
          username: formState.username,
          password: formState.password,
          attributes: { email: formState.email },
        });
        setIsVerify(true);
      } catch (err) {
        console.log(err);
      }
    }
    setIsLoading(false);
  };
  const handleVerify = async () => {
    const verifyResult = await AuthService.confirmSignUp(
      formState.username,
      String(verifyRef.current?.value)
    );
    if (verifyResult !== "Confirmation Failed") {
      setIsVerify(false);
    }
  };
  const checkIfLoggedIn = async () => {
    const result = await AuthService.ifLoggedIn();

    if (result) {
      navigate("/calendar");
    }
  };
  const verifyRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  return (
    <section className="d-grid vw-100 vh-100 justify-content-center align-content-center ">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            {isSignUp ? "Username" : "Username or Email"}
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formState.username}
            onChange={handleChange}
            required={true}
          />
        </div>
        {isSignUp && (
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formState.email}
              onChange={handleChange}
              required={isSignUp}
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formState.password}
            onChange={handleChange}
            required={true}
          />
        </div>
        <button
          className={`btn btn-primary d-block mx-auto`}
          disabled={isLoading}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      {isVerify && (
        <div className="d-flex align-items-center">
          <input
            className="my-2 me-1"
            type="text"
            placeholder="Enter the code here"
            ref={verifyRef}
          />
          <button className="btn btn-secondary" onClick={handleVerify}>
            Verify
          </button>
        </div>
      )}
      <p className="mx-auto"> Do you have an Account?</p>
      <button
        className={`btn ${isSignUp ? "" : "btn-info"}`}
        onClick={() => {
          setIsSignUp(false);
        }}
      >
        YES
      </button>
      <button
        className={`btn ${isSignUp ? "btn-info" : ""}`}
        onClick={() => {
          setIsSignUp(true);
        }}
      >
        NO
      </button>
    </section>
  );
}
