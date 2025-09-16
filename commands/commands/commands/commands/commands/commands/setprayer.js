import { SlashCommandBuilder } from "discord.js";
import fs from "fs";
import config from "../config.json" assert { type: "json" };

export default {
  data: new SlashCommandBuilder()
    .setName("setprayer")
    .setDescription("تعيين إعدادات الأدعية")
    .addChannelOption(opt => opt.setName("channel").setDescription("الروم").setRequired(true))
    .addIntegerOption(opt => opt.setName("interval").setDescription("الفاصل بالثواني").setRequired(true)),

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const interval = interaction.options.getInteger("interval");

    config.prayer.channelId = channel.id;
    config.prayer.interval = interval;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

    await interaction.reply(`✅ تم تحديث الأدعية → روم: ${channel} | كل ${interval} ثانية`);
  }
};
