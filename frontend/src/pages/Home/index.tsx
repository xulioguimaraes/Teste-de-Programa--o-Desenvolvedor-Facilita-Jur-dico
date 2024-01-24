import {
  Box,
  Button,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import clients from "../../services/clients";
import { useNavigate } from "react-router-dom";
import { TableHome } from "../../components/TableHome";
import { useStackbar } from "../../hooks/useSnackBar";
interface IDataPage {
  name: string;
  id: number;
  phone: string;
  email: string;
}
export const Home = () => {
  const [dataPage, setDataPage] = useState<IDataPage[]>([]);
  const [openCollapse, setOpenCollapse] = useState(false);
  const { setOpenSnack } = useStackbar();
  const navigate = useNavigate();
  const getListClient = async () => {
    const response = await clients.list();

    if (response.status === 200) {
      setDataPage(response.data);
    } else {
      setOpenSnack({
        open: true,
        message:
          response?.response?.data?.message ||
          "Ocorreu um erro ao buscar lista de clientes",
        variant: "error",
      });
    }
  };

  useEffect(() => {
    getListClient();
  }, []);
  return (
    <>
      <Box
        sx={{ my: 4 }}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" mb={0} component="h1" gutterBottom>
          Clientes Cadastrados
        </Typography>
        <Box display={"flex"} gap={2}>
          <Button
            size="small"
            sx={{
              minWidth: "50px",
              p: "9px",
            }}
            color="info"
            variant="outlined"
            onClick={() => setOpenCollapse((old) => !old)}
          >
            <SearchIcon />
          </Button>
          <Button
            size="small"
            sx={{
              minWidth: "50px",
              p: "9px",
            }}
            onClick={() => navigate("/cadastrar")}
            color="secondary"
            variant="contained"
          >
            <AddIcon />
          </Button>
        </Box>
      </Box>
      <Collapse in={openCollapse}>
        <TextField
          size="small"
          label="Pesquisa"
          sx={{
            width: "50%",
            mb: 2,
          }}
        />
      </Collapse>
      <TableHome dataPage={dataPage} />
    </>
  );
};
