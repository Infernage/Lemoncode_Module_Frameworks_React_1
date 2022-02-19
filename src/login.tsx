import { css } from "@emotion/css";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const styles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const stylesWithMaxWidth = css`
  ${styles};
  max-width: 800px;
`;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleNavigation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "admin" && password === "test") {
      navigate("/list");
    } else {
      alert("User / password not valid, psst... admin / test");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card className={stylesWithMaxWidth}>
        <CardHeader title="Login" />
        <CardContent>
          <form onSubmit={handleNavigation} className={styles}>
            <div className={styles}>
              <TextField
                label="Username"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
