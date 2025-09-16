import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("مسح رسائل")
    .addIntegerOption(opt => opt.setName("amount").setDescription("عدد الرسائل").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    await interaction.channel.bulkDelete(amount, true);
    await interaction.reply({ content: `😵‍💫 تم مسح ${amount} رسالة`, ephemeral: true });
  }
};
