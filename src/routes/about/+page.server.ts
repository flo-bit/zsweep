// src/routes/about/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase
		.from('game_results')
		.select('win, time'); 

	if (error || !data) {
		console.error('Error fetching stats:', error);
		return {
			stats: { started: 0, completed: 0, seconds: 0 }
		};
	}
	
	const started = data.length;

	const completed = data.filter((game) => game.win === true).length;

	const seconds = data.reduce((total, game) => total + (game.time || 0), 0);

	return {
		stats: {
			started,
			completed,
			seconds
		}
	};
};
