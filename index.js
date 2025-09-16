import { Client, GatewayIntentBits, Collection, REST, Routes } from "discord.js";
import fs from "fs";
import config from "./config.json" assert { type: "json" };

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.commands = new Collection();

// تحميل أوامر السلاش
const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.data.name, command.default);
  commands.push(command.default.data.toJSON());
}

// نشر أوامر السلاش
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log("✅ تم تسجيل أوامر السلاش");
  } catch (err) {
    console.error(err);
  }
})();

// تشغيل أوامر السلاش + الألوان
client.on("interactionCreate", async interaction => {
  // أوامر سلاش
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.default.execute(interaction);
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: "❌ حصل خطأ أثناء تنفيذ الأمر", ephemeral: true });
    }
  }

  // اختيار لون
  if (interaction.isStringSelectMenu() && interaction.customId === "color_select") {
    const roleId = interaction.values[0];
    const role = interaction.guild.roles.cache.get(roleId);
    const member = interaction.member;

    if (!role) return interaction.reply({ content: "❌ الرول غير موجود", ephemeral: true });

    // إزالة الألوان القديمة
    const colorRoleIds = config.colors.map(c => c.roleId);
    await member.roles.remove(colorRoleIds);

    // إضافة اللون الجديد
    await member.roles.add(roleId);
    await interaction.reply({ content: `✅ تم تعيين اللون: ${role.name}`, ephemeral: true });
  }
});

// أوامر عادية
const legacyFiles = fs.readdirSync("./legacy").filter(file => file.endsWith(".js"));
for (const file of legacyFiles) {
  const legacy = await import(`./legacy/${file}`);
  client.on("messageCreate", msg => legacy.default(msg));
}

// أدعية تلقائية
client.once("ready", () => {
  console.log(`🤖 مسجل الدخول كبوت: ${client.user.tag}`);

  if (config.prayer.channelId) {
    setInterval(async () => {
      const channel = await client.channels.fetch(config.prayer.channelId).catch(() => null);
      if (channel) {
        const message = config.prayer.messages[Math.floor(Math.random() * config.prayer.messages.length)];
        channel.send(message);
      }
    }, config.prayer.interval * 1000);
  }
});

client.login(process.env.TOKEN);
