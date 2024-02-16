import { useAppSelector } from "../../hooks/reduxHooks";
import { StyledButton } from "../../common/StyledButton";
import { useLogoutMutation } from "../../features/auth/authApi";
import { selectIsAuth } from "features/auth/selectors";

export const LoginBtn = () => {
  const isAuth = useAppSelector(selectIsAuth);
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
