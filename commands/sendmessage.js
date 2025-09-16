import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("sendmessage")
    .setDescription("إرسال رسالة عبر البوت")
    .addChannelOption(opt =>
      opt.setName("channel").setDescription("الروم المراد الإرسال فيه").setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("text").setDescription("نص الرسالة").setRequired(true)
    )
    .addBooleanOption(opt =>
      opt.setName("embed").setDescription("هل تريد الرسالة امبد؟").setRequired(true)
    ),
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const text = interaction.options.getString("text");
    const embed = interaction.options.getBoolean("embed");

    if (embed) {
      const em = new EmbedBuilder().setDescription(text).setColor("Random");
      await channel.send({ embeds: [em] });
    } else {
      await channel.send(text);
    }

    await interaction.reply({ content: "✅ تم إرسال الرسالة", ephemeral: true });
  }
};
