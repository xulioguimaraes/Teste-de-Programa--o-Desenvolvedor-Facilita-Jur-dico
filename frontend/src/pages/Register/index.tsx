import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { TextMaskCustom } from "../../components/TextMaskCustom";
import clients from "../../services/clients";
import { useStackbar } from "../../hooks/useSnackBar";
import { useEffect, useState } from "react";
import { IForm } from "./types";
import LocationSearchInput from "../../components/LocationSearchInput";

interface IAddress {
  address: string;
  latLng: { lat: number; lng: number };
}

export const Register = () => {
  const navigate = useNavigate();
  const { setOpenSnack } = useStackbar();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const getOldValues = async () => {
    try {
      setIsLoading(true);
      const response = await clients.find(params?.id as string);

      reset({
        ...response.data,
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      setOpenSnack({
        open: true,
        message: errorMessage || "Error ao obter cliente",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (data: IForm) => {
    try {
      const newData = {
        ...data,
        latitude: +data.latitude,
        longitude: +data.longitude,
      };
      if (params?.id) {
        await clients.update(params?.id, newData);
      } else {
        await clients.create(newData);
      }
      setOpenSnack({
        open: true,
        message: "Informações salvas",
        variant: "success",
      });
      navigate("/");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      setOpenSnack({
        open: true,
        message: errorMessage || "Error ao salvar infromações do cliente",
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (params?.id) {
      getOldValues();
    }
  }, []);
  const handleLocationSelect = async (selectedLocation: IAddress) => {
    setValue("address", selectedLocation.address);
    setValue("latitude", selectedLocation.latLng.lat);
    setValue("longitude", selectedLocation.latLng.lng);

    // Use the selected location data as needed in your application.
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
          {params?.id ? "Editar" : "Cadastro"}
        </Typography>
      </Box>
      {isLoading ? (
        <Box display="flex" my={6} justifyContent={"center"}>
          <CircularProgress />
        </Box>
      ) : (
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
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <LocationSearchInput
                    {...field}
                    onSelect={handleLocationSelect}
                  />
                )}
              />
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
      )}
    </>
  );
};
