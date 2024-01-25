import { Box, Button, Collapse, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import clients from "../../services/clients";
import { useNavigate } from "react-router-dom";
import { TableHome } from "../../components/TableHome";
import { useStackbar } from "../../hooks/useSnackBar";
import debounce from "debounce";
interface IDataPage {
  name: string;
  id: number;
  phone: string;
  email: string;
}
interface IParamsConfig {
  search_term: string;
  page: number;
  per_page: number;
}
const defaultValuesParamsConfig = {
  search_term: "",
  page: 1,
  per_page: 10,
};
export const Home = () => {
  const [dataPage, setDataPage] = useState<IDataPage[]>([]);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [paramsConfig, setParamsConfig] = useState<IParamsConfig>(
    defaultValuesParamsConfig
  );
  const { setOpenSnack } = useStackbar();
  const navigate = useNavigate();
  const getListClient = async () => {
    const response = await clients.list(paramsConfig);

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
    const response = await clients.delete(id);

    if (response.status === 200) {
      setOpenSnack({
        open: true,
        message: "Cliente deletado",
        variant: "success",
      });
      const copyParams = { ...paramsConfig };
      setParamsConfig(copyParams);
    } else {
      setOpenSnack({
        open: true,
        message:
          response?.response?.data?.message ||
          "Ocorreu um erro ao deletar cliente",
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
          onChange={(e) => debounceChange(e.target.value, "search_term")}
        />
      </Collapse>
      <TableHome
        dataPage={dataPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
        params={paramsConfig}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};
