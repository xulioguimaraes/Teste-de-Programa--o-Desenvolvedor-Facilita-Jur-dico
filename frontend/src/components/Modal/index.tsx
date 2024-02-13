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
  IconButton,
} from "@mui/material";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import clients from "../../services/clients";
import { useStackbar } from "../../hooks/useSnackBar";
import DirectionsIcon from "@mui/icons-material/Directions";
interface IModalProps {
  open: boolean;
  onClose: () => void;
}

interface IData {
  name: string;
  id: number;
  phone: string;
  email: string;
  distance: string;
  latitude: number;
  longitude: number;
}
const CellModal = ({
  children,
  styles,
}: {
  children: ReactNode;
  styles?: CSSProperties;
}) => {
  return (
    <span
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        ...styles,
      }}
    >
      {children}
    </span>
  );
};

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
  const openGoogleMaps = (itemRow: IData) => {
    const mapsUrl = `https://www.google.com/maps?q=${itemRow.latitude},${itemRow.longitude}`;
    window.open(mapsUrl);
  };

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
            gridTemplateColumns={"1fr 150px 1fr 80px 80px"}
            gap={2}
            fontWeight="bold"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            <CellModal>Nome</CellModal>
            <CellModal>Telefone</CellModal>
            <CellModal>Email</CellModal>
            <CellModal>Distancia</CellModal>
            <CellModal>Ir para</CellModal>
          </Box>
          <Box>
            {data.map((item) => (
              <>
                <Box
                  key={item.email}
                  display={"grid"}
                  gridTemplateColumns={"1fr 150px 1fr 80px 80px"}
                  gap={2}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  <CellModal>{item.name}</CellModal>
                  <CellModal>{item.phone}</CellModal>
                  <CellModal>{item.email}</CellModal>
                  <CellModal>{item.distance}</CellModal>
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => openGoogleMaps(item)}
                    >
                      <DirectionsIcon />
                    </IconButton>
                  </span>
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
