import { Alert, Snackbar } from "@mui/material";
import { ReactNode, createContext, useContext, useState } from "react";
interface ISnackbarProvider {
  children: ReactNode;
}
interface ISnack {
  open: boolean;
  message: string;
  variant: "success" | "info" | "warning" | "error";
}
interface ISnackbarContextProps {
  openSnack: ISnack;
  setOpenSnack: (data: ISnack) => void;
}
const SnackbarContext = createContext({} as ISnackbarContextProps);

const defaultValuesSnack = {
  open: false,
  message: "",
  variant: "success",
};
export const SnackbarProvider = ({ children }: ISnackbarProvider) => {
  const [openSnack, setOpenSnack] = useState<ISnack>(
    defaultValuesSnack as ISnack
  );
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(defaultValuesSnack as ISnack);
  };
  return (
    <SnackbarContext.Provider value={{ openSnack, setOpenSnack }}>
      {children}
      <Snackbar
        open={openSnack.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={openSnack.variant}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {openSnack.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
export const useStackbar = () => useContext(SnackbarContext);
