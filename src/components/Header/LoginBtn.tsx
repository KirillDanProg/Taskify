import { StyledButton } from "../../common/components/StyledButton";
import { useLogoutMutation, useMeQuery } from "../../features/auth/authApi";

export const LoginBtn = () => {
  const { data } = useMeQuery();
  const isAuth = data?.id;
  const [logout] = useLogoutMutation();

  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      {isAuth ? (
        <StyledButton style={{ color: "white" }} onClick={logoutHandler}>
          LOGOUT
        </StyledButton>
      ) : (
        <h2>Taskify</h2>
      )}
    </>
  );
};
