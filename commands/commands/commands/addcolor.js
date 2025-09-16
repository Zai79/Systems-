import { SlashCommandBuilder } from "discord.js";
import fs from "fs";
import config from "../config.json" assert { type: "json" };

export default {
  data: new SlashCommandBuilder()
    .setName("addcolor")
    .setDescription("إضافة لون جديد")
    .addStringOption(opt => opt.setName("roleid").setDescription("آيدي الرول").setRequired(true))
    .addStringOption(opt => opt.setName("name").setDescription("اسم اللون").setRequired(true))
    .addStringOption(opt => opt.setName("emoji").setDescription("الإيموجي").setRequired(true)),

  async execute(interaction) {
    const roleId = interaction.options.getString("roleid");
    const name = interaction.options.getString("name");
    const emoji = interaction.options.getString("emoji");

    config.colors.push({ roleId, name, emoji });
    fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

    await interaction.reply(`✅ تمت إضافة اللون ${emoji} ${name}`);
  }
};
