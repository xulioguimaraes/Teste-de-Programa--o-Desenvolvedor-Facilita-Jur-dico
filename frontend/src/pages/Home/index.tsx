import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Skeleton,
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
import debounce from "debounce";
import { Modal } from "../../components/Modal";
import { IDataPage, IParamsConfig } from "./types";

const defaultValuesParamsConfig = {
  search_term: "",
  page: 1,
  per_page: 10,
};
export const Home = () => {
  const [dataPage, setDataPage] = useState<IDataPage[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const [openCollapse, setOpenCollapse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paramsConfig, setParamsConfig] = useState<IParamsConfig>(
    defaultValuesParamsConfig
  );
  const { setOpenSnack } = useStackbar();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const getListClient = async () => {
    try {
      setIsLoading(true);

      const response = await clients.list(paramsConfig);

      setDataPage(response.data);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      setOpenSnack({
        open: true,
        message: errorMessage || "Ocorreu um erro ao buscar lista de clientes",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const debounceChange = debounce((value, name) => {
    setParamsConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, 750);

  const handleEdit = (id: number) => {
    navigate(`/editar/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await clients.delete(id);
      setOpenSnack({
        open: true,
        message: "Cliente deletado",
        variant: "success",
      });
      const copyParams = { ...paramsConfig };
      setParamsConfig(copyParams);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;

      setOpenSnack({
        open: true,
        message: errorMessage || "Ocorreu um erro ao deletar cliente",
        variant: "error",
      });
    }
  };
  const handleChangePage = (page: number) => {
    setParamsConfig((old) => ({ ...old, page }));
  };

  const handleChangeRowsPerPage = (perPage: number) => {
    setParamsConfig((old) => ({ ...old, per_page: perPage }));
  };

  useEffect(() => {
    getListClient();
  }, [paramsConfig]);
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
            color="secondary"
            variant="outlined"
            onClick={handleClickOpen}
          >
            ordem de visitação
          </Button>

          <Button
            size="small"
            sx={{
              minWidth: "50px",
              p: "9px",
            }}
            color="secondary"
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
      <Collapse in={openCollapse} unmountOnExit>
        <TextField
          size="small"
          label="Pesquisa"
          sx={{
            width: "50%",
            mb: 2,
          }}
          onChange={(e) => debounceChange(e.target.value, "search_term")}
        />
      </Collapse>
      {isLoading ? (
        <Box display={"flex"} justifyContent={"center"} pt={10}>
          <CircularProgress />
        </Box>
      ) : (
        <TableHome
          dataPage={dataPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
          params={paramsConfig}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
      {openModal && <Modal onClose={handleClose} open={openModal} />}
    </>
  );
};
