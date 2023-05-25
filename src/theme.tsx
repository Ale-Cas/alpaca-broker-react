import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
    typography: {
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#CCC",
        },
        secondary: {
            main: "#ebeb34",
            dark: "#0b1a00",
        },
        background: {
            default: "#212121",
        },
        text: {
            primary: "#bdbdbd",
        },
    },
});

export const lineChartOptions = {
    is3D: true,
    backgroundColor: "transparent",
    titleTextStyle: {
        color: "white",
        bold: true,
    },
    legendTextStyle: {
        color: "white",
        opacity: 0.8,
    },
    legend: {
        position: "none"
    },
    colors: ["yellow", "green", "red",],
    vAxis: {
        textStyle: {
            color: "white",
        },
    },
    hAxis: {
        textStyle: {
            color: "white",
        },
        slantedText: true,
    },
};

export const lineChartSize = {
    width: "100%",
    height: "400px",
}

export const pieChartOptions = {
    is3D: true,
    backgroundColor: "transparent",
    titleTextStyle: {
        color: "white",
        bold: true,
    },
    legendTextStyle: {
        // The color of the text.
        color: "white",
        // The transparency of the text.
        opacity: 0.8,
    },
};
