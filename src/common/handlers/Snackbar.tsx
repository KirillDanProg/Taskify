import * as React from "react";
import { Snackbar, Stack, type AlertProps } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "common/hooks/reduxHooks";
import { resetError } from "app/appSlice";
import { selectAppError } from "app/selectors";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomSnackbar() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAppError);
  const handleClose = () => {
    dispatch(resetError());
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
