"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const register_command_1 = __importDefault(require("./register-command"));
const { Client, Intents } = require("discord.js");
class WatchActivity {
    constructor() {
        this.token = process.env.TOKEN;
        this.client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            ],
        });
        new register_command_1.default();
        this.client.login(this.token);
        this.client.on("ready", this.onReady);
        this.client.on("interactionCreate", this.onInteraction);
    }
    onReady(client) {
        console.log(`Ready ${client.user.username}`);
    }
    onInteraction(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isCommand())
                return;
            if (interaction.commandName === 'ping') {
                yield interaction.reply('Pong!');
            }
        });
    }
}
new WatchActivity();
