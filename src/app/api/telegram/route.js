// app/api/telegram/route.js
import TelegramBot from "node-telegram-bot-api";

const CORS_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req) {
    try {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = Number(process.env.TELEGRAM_CHAT_ID);
        const threadId = process.env.TELEGRAM_THREAD_ID;
        const { text } = await req.json()

        const bot = new TelegramBot(token, { polling: false });

        await bot.sendMessage(chatId, text, {
            message_thread_id: threadId,
        });

        bot.stopPolling?.();

        console.log("[POST] /api/telegram — отправлено:", text);

        return new Response(
            JSON.stringify({ success: true, message: "Сообщение отправлено" }),
            { headers: CORS_HEADERS, status: 200 }
        );
    } catch (error) {
        console.error("Ошибка отправки в Telegram:", error);
        return new Response(
            JSON.stringify({ error: "Ошибка отправки сообщения" }),
            { headers: CORS_HEADERS, status: 500 }
        );
    }
}