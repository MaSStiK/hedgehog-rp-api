export const metadata = {
    title: "Hedgehog-rp-api",
    description: "API для Hedgehog-rp",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body>
                {children}
            </body>
        </html>
    );
}
