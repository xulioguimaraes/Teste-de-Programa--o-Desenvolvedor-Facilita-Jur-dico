import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import clients from "../../services/clients";
import { useStackbar } from "../../hooks/useSnackBar";

interface IModalProps {
  open: boolean;
  onClose: () => void;
}

interface IData {
  name: string;
  id: number;
  phone: string;
  email: string;
  coordinatey: number;
  coordinatex: number;
}

export const Modal = ({ onClose, open }: IModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IData[]>([]);
  const { setOpenSnack } = useStackbar();

  const getClients = async () => {
    setIsLoading(true);
    try {
      const response = await clients.calculate();
      setData(response.data);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      setOpenSnack({
        open: true,
        message: errorMessage || "Error ao obter clientes",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getClients();
  }, []);
  return (
    <Dialog
      open={open}
      maxWidth="md"
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Ordem de Visitação dos Clientes
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Os clientes estão organizados pela a ordem de visitação, os mais
          proximos são os primeiros.
        </DialogContentText>
        {isLoading ? (
          <Box display="flex" my={6} justifyContent={"center"}>
            <CircularProgress />
          </Box>
        ) : (
          <></>
        )}

        <Collapse in={!isLoading}>
          <Box
            mt={2}
            display={"grid"}
            gridTemplateColumns={"1fr 1fr 1fr"}
            gap={2}
          >
            <strong>Nome</strong>
            <strong>Telefone</strong>
            <strong>Email</strong>
          </Box>
          <Box>
            {data.map((item) => (
              <>
                <Box
                  key={item.email}
                  display={"grid"}
                  gridTemplateColumns={"1fr 1fr 1fr"}
                  gap={2}
                >
                  <span>{item.name}</span>
                  <span>{item.phone}</span>
                  <span>{item.email}</span>
                </Box>
                <Divider />
              </>
            ))}
          </Box>
        </Collapse>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};
