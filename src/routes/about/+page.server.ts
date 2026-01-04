import { supabase } from '$lib/supabase.ts'; // Adjust path to your client
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// 1. Total Tests Started
	const { count: totalStarted } = await supabase
		.from('game_results')
		.select('*', { count: 'exact', head: true });

	// 2. Total Tests Completed (Won)
	const { count: totalCompleted } = await supabase
		.from('game_results')
		.select('*', { count: 'exact', head: true })
		.eq('win', true);

	// 3. Total Time Sweeping
	const { data: timeRecords } = await supabase
		.from('game_results')
		.select('setting')
		.eq('mode', 'time');

	const totalSeconds =
		timeRecords?.reduce((acc, curr) => acc + parseInt(curr.setting || '0'), 0) || 0;

	return {
		stats: {
			started: totalStarted || 0,
			completed: totalCompleted || 0,
			seconds: totalSeconds
		}
	};
};
