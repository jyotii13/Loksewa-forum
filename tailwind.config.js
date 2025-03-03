/** @type {import('tailwindcss').Config} */
export const content = [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if you have a `src` folder:
    "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
    extend: {},
};
export const plugins = [
    require('tailwindcss-animate'),
];
  