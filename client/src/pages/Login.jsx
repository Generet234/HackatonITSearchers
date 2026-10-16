import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Alert,
    Box,
    Button,
    InputAdornment,
    Link,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const FOREST = "#123524";
const SUN = "#FFC93C";
const MOSS = "#1E5A3C";
const INK = "#14231B";

const theme = createTheme({
    palette: {
        primary: { main: FOREST },
        text: { primary: INK },
    },
    typography: {
        fontFamily: '"Onest", "Segoe UI", system-ui, -apple-system, sans-serif',
    },
    shape: { borderRadius: 10 },
});

// Три пересекающихся круга: люди, которые собираются вместе
const Circles = () => (
    <svg viewBox="0 0 320 200" width="100%" style={{ maxWidth: 360 }} aria-hidden="true">
        <circle cx="120" cy="100" r="80" fill={SUN} />
        <circle cx="200" cy="100" r="80" fill={MOSS} stroke={SUN} strokeWidth="3" />
        <circle cx="160" cy="60" r="80" fill="none" stroke="#fff" strokeWidth="3" />
    </svg>
);

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: { username: "", password: "" } });

    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setServerError("");
            setIsLoading(true);

            const res = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                    expiresInMins: 30,
                }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Неверный логин или пароль");

            localStorage.setItem("token", result.accessToken);
            navigate("/home");
        } catch (err) {
            setServerError(err.message || "Не удалось войти. Проверьте логин и пароль.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
                {/* Левая панель */}
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: "0 0 46%",
                        bgcolor: FOREST,
                        color: "#fff",
                        p: { md: 6, lg: 8 },
                    }}
                >
                    <Typography sx={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.01em" }}>
                        Рядом
                    </Typography>

                    <Box>
                        <Circles />
                        <Typography
                            component="h2"
                            sx={{
                                mt: 5,
                                fontSize: { md: 38, lg: 46 },
                                fontWeight: 800,
                                lineHeight: 1.1,
                                letterSpacing: "-0.03em",
                                maxWidth: 440,
                            }}
                        >
                            Добрые дела начинаются с встречи
                        </Typography>
                        <Typography sx={{ mt: 2, maxWidth: 400, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                            Волонтёры находят, где они нужны. Организации находят тех, кто готов помочь.
                        </Typography>
                    </Box>

                    <Box sx={{ width: 56, height: 6, bgcolor: SUN, borderRadius: 3 }} />
                </Box>

                {/* Форма */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: { xs: 3, sm: 6 },
                    }}
                >
                    <Box sx={{ width: "100%", maxWidth: 400 }}>
                        <Typography
                            sx={{
                                display: { xs: "block", md: "none" },
                                fontWeight: 700,
                                fontSize: 20,
                                color: FOREST,
                                mb: 4,
                            }}
                        >
                            Рядом
                        </Typography>

                        <Typography
                            component="h1"
                            sx={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", color: INK }}
                        >
                            С возвращением
                        </Typography>
                        <Typography sx={{ mt: 1, mb: 4, color: "text.secondary" }}>
                            Войдите, чтобы продолжить
                        </Typography>

                        {serverError && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {serverError}
                            </Alert>
                        )}

                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                        >
                            <TextField
                                fullWidth
                                label="Логин"
                                autoComplete="username"
                                autoFocus
                                {...register("username", { required: "Введите логин" })}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />

                            <TextField
                                fullWidth
                                label="Пароль"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                {...register("password", { required: "Введите пароль" })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button
                                                    size="small"
                                                    onClick={() => setShowPassword((v) => !v)}
                                                    sx={{ textTransform: "none", minWidth: 0, color: MOSS }}
                                                >
                                                    {showPassword ? "Скрыть" : "Показать"}
                                                </Button>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                disableElevation
                                sx={{
                                    mt: 1,
                                    py: 1.6,
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    textTransform: "none",
                                    bgcolor: FOREST,
                                    "&:hover": { bgcolor: MOSS },
                                    "&:focus-visible": { outline: `3px solid ${SUN}`, outlineOffset: 2 },
                                }}
                            >
                                {isLoading ? "Входим..." : "Войти"}
                            </Button>
                        </Box>

                        <Typography sx={{ mt: 4, textAlign: "center", color: "text.secondary" }}>
                            Впервые здесь?{" "}
                            <Link
                                component={RouterLink}
                                to="/register"
                                underline="always"
                                sx={{ color: FOREST, fontWeight: 700 }}
                            >
                                Создать аккаунт
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Login;