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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
class RegisterCommand {
    constructor() {
        this.commands = [
            {
                name: "ping",
                description: "Replies with Pong!",
            },
        ];
        this.client_id = process.env.CLIENT_ID;
        this.guild_id = process.env.GUILD_ID;
        this.rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
        this.register();
    }
    register() {
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Started refreshing application (/) commands.");
                yield this.rest.put(Routes.applicationGuildCommands(this.client_id, this.guild_id), { body: this.commands });
                console.log("Successfully reloaded application (/) commands.");
            }
            catch (error) {
                console.error(error);
            }
        }))();
    }
}
exports.default = RegisterCommand;
