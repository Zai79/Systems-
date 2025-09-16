import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("إعطاء ميوت لعضو (تحتاج رول Muted موجود)")
    .addUserOption(opt => opt.setName("user").setDescription("العضو").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = await interaction.guild.members.fetch(user.id);
    const mutedRole = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");

    if (!mutedRole) return interaction.reply("❌ ما لقيت رول Muted");
    await member.roles.add(mutedRole);
    await interaction.reply(`😩 اسكت شوية ${user.tag}`);
  }
};
