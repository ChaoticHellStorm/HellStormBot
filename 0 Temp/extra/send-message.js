require('dotenv').config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  '1017206071338729572',
  '1017200231647027330',
  '1017201445935775754',
];

client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get('1197754576611328000');
    if (!channel) return;

    const row = new ActionRowBuilder();

    row.components.push(
      new ButtonBuilder()
        .setCustomId('Verified')
        .setLabel('Verify!')
        .setStyle(ButtonStyle.Primary)
    );

    await channel.send({
      content: 'Click to Verify!',
      components: [row],
    });
  } catch (error) {
    console.log(error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'Verified') {
    try {
      const member = interaction.guild.members.cache.get(interaction.user.id);

      await member.roles.add(roles);

      interaction.reply({
        content: 'You have been Verified!',
        flags: ['Ephemeral'],
      });
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: 'There was an error while assigning roles.',
        flags: ['Ephemeral'],
      });
    }
  }
});

client.login(process.env.TOKEN);
