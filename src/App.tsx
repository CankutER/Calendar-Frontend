import { LoginPage } from "./pages/loginPage";
import { UserPage } from "./pages/userPage";
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { UserContextProvider } from "./context";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/calendar"
          element={
            <UserContextProvider>
              <UserPage />
            </UserContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
