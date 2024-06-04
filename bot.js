const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require("./src/jsons/config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
    ]
});

// Quando estiver pronto
client.on("ready", () => {
    console.log(`Iniciado como ${client.user.tag}!`);
    console.log(`Bot iniciado com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais e em ${client.guilds.cache.size} servidores`);
    // Atualizar status do bot
    client.user.setActivity(`I Wanna Be Your Slave`, { type: ActivityType.Listening });
});

// Quando entrar em um servidor
client.on("guildCreate", guild => {
    console.log(`\n\nO bot entrou no servidor ${guild.name}\nID: ${guild.id}\nMembros: ${guild.memberCount}`);
});

// Quando sair de um servidor
client.on("guildDelete", guild => {
    console.log(`\n\nO bot foi removido do servidor ${guild.name}\nID: ${guild.id}`);
});

// Ver mensagens
client.on("messageCreate", async message => {
    // Ignorar as mensagens do próprio bot, sem prefixo e fora de servidor
    if (!message.content.startsWith(config.prefix) || message.author.bot || !message.guild) return;

    // Extrair texto do comando sem o prefixo
    const args = message.content.slice(config.prefix.length).trim().split(" ");
    const comando = args.shift().toLowerCase();

    if(comando === "teste"){
        message.channel.send("funcionou");
    }
});

// Adicionar token
client.login(config.token);
