import { SlashCommandBuilder } from "discord.js";
import fs from "fs";
import config from "../config.json" assert { type: "json" };

export default {
  data: new SlashCommandBuilder()
    .setName("removecolor")
    .setDescription("حذف لون")
    .addStringOption(opt => opt.setName("roleid").setDescription("آيدي الرول").setRequired(true)),

  async execute(interaction) {
    const roleId = interaction.options.getString("roleid");
    config.colors = config.colors.filter(c => c.roleId !== roleId);
    fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

    await interaction.reply("❎ تم حذف اللون");
  }
};
