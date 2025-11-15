/** @type {import('tailwindcss').Config} */
export default {
content: [
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {
colors: {
primary: '#6366F1',
primaryHover: '#4F46E5',
success: '#10B981',
warning: '#F59E0B',
error: '#EF4444',
gold: '#FFD700',
streak: '#FF6B6B',
},
},
},
plugins: [],
}