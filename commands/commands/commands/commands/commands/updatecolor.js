import { SlashCommandBuilder } from "discord.js";
import fs from "fs";
import config from "../config.json" assert { type: "json" };

export default {
  data: new SlashCommandBuilder()
    .setName("updatecolor")
    .setDescription("تحديث لون")
    .addStringOption(opt => opt.setName("roleid").setDescription("آيدي الرول").setRequired(true))
    .addStringOption(opt => opt.setName("name").setDescription("الاسم الجديد").setRequired(false))
    .addStringOption(opt => opt.setName("emoji").setDescription("الإيموجي الجديد").setRequired(false)),

  async execute(interaction) {
    const roleId = interaction.options.getString("roleid");
    const name = interaction.options.getString("name");
    const emoji = interaction.options.getString("emoji");

    const color = config.colors.find(c => c.roleId === roleId);
    if (!color) return interaction.reply("❌ اللون غير موجود");

    if (name) color.name = name;
    if (emoji) color.emoji = emoji;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

    await interaction.reply(`✅ تم تحديث اللون ${emoji || ""} ${name || color.name}`);
  }
};
