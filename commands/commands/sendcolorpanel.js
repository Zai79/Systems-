import { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } from "discord.js";
import config from "../config.json" assert { type: "json" };

export default {
  data: new SlashCommandBuilder()
    .setName("sendcolorpanel")
    .setDescription("إرسال بانل الألوان"),

  async execute(interaction) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId("color_select")
      .setPlaceholder("اختر لونك 🎨")
      .addOptions(
        config.colors.map(c => ({
          label: c.name,
          value: c.roleId,
          emoji: c.emoji
        }))
      );

    const row = new ActionRowBuilder().addComponents(menu);
    await interaction.reply({ content: "اختر لونك المفضل 👇", components: [row] });
  }
};
