import Container from "@mui/material/Container";

import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { SnackbarProvider } from "./hooks/useSnackBar";

export default function App() {
  return (
    <SnackbarProvider>
      <Container maxWidth="md">
        <RouterProvider router={router} />
      </Container>
    </SnackbarProvider>
  );
}
