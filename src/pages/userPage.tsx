import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../Auth/AuthService";
import { DateSelection } from "../components/dateSelection";
import { Board } from "../components/board";
import { useGlobalContext } from "../context";
import { getToken, getUserName } from "../utils/getSessionInfo";

const API_URL =
  "https://u8h02kmfpb.execute-api.eu-central-1.amazonaws.com/prod/user";

export function UserPage(): ReactElement {
  const [username, setUsername] = useState<string>("");
  const { state, handleState } = useGlobalContext();
  const navigate = useNavigate();

  const checkUser = async () => {
    const result = await AuthService.ifLoggedIn();
    if (!result) {
      return navigate("/");
    }

    const username = await getUserName();
    setUsername(username);
  };

  const logOut = async () => {
    try {
      const logoutResult = await Auth.signOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const fetchItems = async () => {
    const token = await getToken();
    const username = await getUserName();

    try {
      const result = await fetch(
        `${API_URL}?userName=${username}&month=${state.selectedMonth}&year=${state.selectedYear}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const items = await result.json();
      console.log(items);

      handleState({ ...state, events: items });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  useEffect(() => {
    fetchItems();
  }, [state.selectedMonth, state.selectedYear]);

  return (
    <main>
      <header className="d-flex justify-content-around py-3">
        <h1>Welcome {username}</h1>
        <button className="btn btn-primary" onClick={logOut}>
          Sign Out
        </button>
      </header>
      <DateSelection></DateSelection>
      <Board></Board>
    </main>
  );
}
