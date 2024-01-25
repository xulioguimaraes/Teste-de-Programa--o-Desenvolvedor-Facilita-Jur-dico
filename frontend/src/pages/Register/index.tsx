import {
  Box,
  Button,
  FormControl,
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

import { useStackbar } from "../../hooks/useSnackBar";

interface IForm {
  name: string;
  phone: string;
  email: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const { setOpenSnack } = useStackbar();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const onSubmit = async (data: IForm) => {
    try {
      await clients.create(data);
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
