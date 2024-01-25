import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
interface ITableHomeProps {
  dataPage: IDataPage[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  params: IParamsConfig;
  handleChangeRowsPerPage: (perPage: number) => void;
  handleChangePage: (page: number) => void;
}

interface IRowProps {
  name: string;
  id: number;
  phone: string;
  email: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
const Rows = ({ onDelete, onEdit, ...row }: IRowProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(row.id);
    handleClose();
  };
  const handleDelete = () => {
    onDelete(row.id);
    handleClose;
  };
  return (
    <TableRow
      key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleEdit}>
            <Box display={"flex"} gap={1}>
              <EditIcon />
              <span>Editar</span>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <Box display={"flex"} gap={1}>
              <DeleteIcon />
              <span>Deletar</span>
            </Box>
          </MenuItem>
        </Menu>
      </TableCell>
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell align="right">{row.name}</TableCell>
      <TableCell align="right">{row.email}</TableCell>
      <TableCell align="right">{row.phone}</TableCell>
    </TableRow>
  );
};
export const TableHome = ({
  dataPage = [],
  onDelete,
  onEdit,
  params,
  handleChangePage,
  handleChangeRowsPerPage,
}: ITableHomeProps) => {
  const onChangePage = (event: unknown, newPage: number) => {
    handleChangePage(newPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeRowsPerPage(parseInt(event.target.value, 10));
  };
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Opções</TableCell>
            <TableCell>Id</TableCell>
            <TableCell align="right">Nome</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Telefone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataPage?.map((row) => (
            <Rows onDelete={onDelete} onEdit={onEdit} {...row} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataPage?.length}
        rowsPerPage={params.per_page}
        page={params.page - 1}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        labelRowsPerPage={"Linhas por pagina"}
      />
    </TableContainer>
  );
};
