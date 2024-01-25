import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextMaskCustom } from "../../components/TextMaskCustom";
import clients from "../../services/clients";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useStackbar } from "../../hooks/useSnackBar";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
interface IForm {
  name: string;
  phone: string;
  email: string;
  coordX: number;
  coordY: number;
}

export const Register = () => {
  const navigate = useNavigate();
  const { setOpenSnack } = useStackbar();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      coordX: 0,
      coordY: 0,
    },
  });
  const onSubmit = async (data: IForm) => {
    if (data.coordX === 0 && data.coordY === 0) {
      setOpenSnack({
        open: true,
        message: "Uma das coordenadas de X e Y precisão ser maior do que ZERO",
        variant: "error",
      });
      return;
    }
    try {
      await clients.create({
        ...data,
        coordinatex: String(data.coordX),
        coordinatey: String(data.coordY),
      });
      setOpenSnack({
        open: true,
        message: "Cliente cadastrado",
        variant: "success",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setOpenSnack({
        open: true,
        message: "Error ao cadastrar clinete",
        variant: "error",
      });
    }
  };

  const handleAddCoordinateX = () => {
    const valueX = getValues("coordX");

    setValue("coordX", valueX + 1);
  };
  const handleRemoveCoordinateX = () => {
    const valueX = getValues("coordX");
    if (valueX <= 0) {
      return;
    }
    setValue("coordX", valueX - 1);
  };
  const handleAddCoordinateY = () => {
    const valueY = getValues("coordY");

    setValue("coordY", valueY + 1);
  };
  const handleRemoveCoordinateY = () => {
    const valueY = getValues("coordY");
    if (valueY <= 0) {
      return;
    }
    setValue("coordY", valueY - 1);
  };

  return (
    <>
      <Box
        sx={{ my: 4 }}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" mb={0} component="h1" gutterBottom>
          Cadastro
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <FormControl variant="standard">
            <TextField
              {...register("name", {
                required: true,
              })}
              label="Nome"
              size="small"
              variant="standard"
              error={!!errors?.name}
            />
          </FormControl>

          <Box display={"flex"} gap={2} width={"100%"}>
            <FormControl
              sx={{
                width: "100%",
              }}
            >
              <TextField
                {...register("email", {
                  required: true,
                })}
                type="email"
                label="Email"
                size="small"
                name="email"
                variant="standard"
                error={!!errors?.email}
              />
            </FormControl>

            <FormControl
              sx={{
                width: "100%",
              }}
              variant="standard"
              error={!!errors?.phone}
            >
              <InputLabel htmlFor="phone">Telefone</InputLabel>
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="small"
                    name="telefone"
                    id="phone"
                    inputComponent={TextMaskCustom as any}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box display={"flex"} gap={2}>
            <FormControl>
              <Typography>Coordenada X</Typography>
              <Box display={"flex"} alignItems={"center"}>
                <IconButton onClick={handleRemoveCoordinateX}>
                  <RemoveCircleIcon />
                </IconButton>
                <Chip label={watch("coordX")} />
                <IconButton size="small" onClick={handleAddCoordinateX}>
                  <AddCircleIcon />
                </IconButton>
              </Box>
            </FormControl>
            <FormControl>
              <Typography>Coordenada Y</Typography>
              <Box display={"flex"} alignItems={"center"}>
                <IconButton onClick={handleRemoveCoordinateY}>
                  <RemoveCircleIcon />
                </IconButton>
                <Chip label={watch("coordY")} />
                <IconButton size="small" onClick={handleAddCoordinateY}>
                  <AddCircleIcon />
                </IconButton>
              </Box>
            </FormControl>
          </Box>
        </Stack>
        <Box display={"flex"} justifyContent={"flex-end"} mt={2} gap={2}>
          <Box display={"flex"} gap={2}>
            <Button
              size="small"
              sx={{
                minWidth: "50px",
                p: "9px",
              }}
              onClick={() => navigate("/")}
              type="button"
              color="secondary"
              variant="outlined"
            >
              voltar
            </Button>
            <Button
              size="small"
              sx={{
                minWidth: "50px",
                p: "9px",
              }}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};
