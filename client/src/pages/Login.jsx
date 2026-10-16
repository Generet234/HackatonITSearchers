import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Box,
    Button,
    Typography,
    TextField,
    MenuItem,
    Paper,
    Alert,
} from "@mui/material";
import { useLoginUserAndGetTokensMutation } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            secondName: "",
            gender: "",
            email: "",
            password: "",
        },
    });

    const [serverError, setServerError] = useState("");
    const [loginUser, { isLoading }] = useLoginUserAndGetTokensMutation();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setServerError("");
            const result = await loginUser({
                username: data.username,
                password: data.password,
                expiresInMins: 30,
            }).unwrap();

            localStorage.setItem("token", result.accessToken);
            navigate("/");
        } catch (err) {
            console.error(err);
            setServerError(err?.data?.message || "Не удалось войти. Проверьте данные.");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                bgcolor: "#f4f6f8",
                p: 2,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: { xs: 3, sm: 4 },
                    width: "100%",
                    maxWidth: 450,
                    borderRadius: 4,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    fontWeight="700"
                    align="center"
                    gutterBottom
                    sx={{ mb: 1 }}
                >
                    Регистрация
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 3 }}
                >
                    Заполните данные для создания аккаунта
                </Typography>

                {serverError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {serverError}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                    {/* Имя */}
                    <TextField
                        fullWidth
                        label="Имя"
                        placeholder="Введите ваше имя"
                        variant="outlined"
                        {...register("username", { required: "Введите ваше имя" })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    {/* Фамилия */}
                    <TextField
                        fullWidth
                        label="Фамилия"
                        placeholder="Введите вашу фамилию"
                        variant="outlined"
                        {...register("secondName", { required: "Введите вашу фамилию" })}
                        error={!!errors.secondName}
                        helperText={errors.secondName?.message}
                    />

                    {/* Пол (через Controller для корректной работы Select в React Hook Form) */}
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required: "Выберите пол" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                fullWidth
                                label="Пол"
                                error={!!errors.gender}
                                helperText={errors.gender?.message}
                            >
                                <MenuItem value="female">Женский (Female)</MenuItem>
                                <MenuItem value="male">Мужской (Male)</MenuItem>
                                <MenuItem value="other">Другой (Other)</MenuItem>
                            </TextField>
                        )}
                    />

                    {/* Email */}
                    <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        placeholder="example@mail.com"
                        variant="outlined"
                        {...register("email", {
                            required: "Введите Email",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Некорректный формат email",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    {/* Пароль */}
                    <TextField
                        fullWidth
                        type="password"
                        label="Пароль"
                        placeholder="Введите пароль"
                        variant="outlined"
                        {...register("password", {
                            required: "Введите пароль",
                            minLength: {
                                value: 6,
                                message: "Пароль должен быть не менее 6 символов",
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    {/* Кнопка */}
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        sx={{
                            mt: 1,
                            py: 1.5,
                            borderRadius: 3,
                            fontSize: "1rem",
                            fontWeight: 600,
                            textTransform: "none",
                            boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                        }}
                    >
                        {isLoading ? "Загрузка..." : "Зарегистрироваться"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginForm;