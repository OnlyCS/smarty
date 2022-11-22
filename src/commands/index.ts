import { Collection } from 'discord.js';

import { BaseCommand } from './BaseCommand';
import { Ping } from './Ping';


export { ReplyData } from './BaseCommand';
export { BaseCommand };

export default new Collection<string, BaseCommand>()
	.set('ping', new Ping());