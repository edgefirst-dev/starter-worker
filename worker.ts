import schema from "db:schema";

import jobsManager from "app:core/jobs-manager";
import { FetchGravatarProfileJob } from "app:jobs/fetch-gravatar-profile";
import { bootstrap } from "@edgefirst-dev/core/worker";
import { createRequestHandler } from "react-router";

export default bootstrap(
	{ orm: { schema }, rateLimit: { limit: 1000, period: 60 } },
	{
		// @ts-expect-error The RR handler returns a Response with a different type
		async onRequest(request) {
			let handler = createRequestHandler(
				// @ts-expect-error The RR handler expects a different type
				() => import("./build/server/index.js"),
				"production",
			);

			// @ts-expect-error The RR handler exepcts a Request with a different type
			return await handler(request);
		},

		async onSchedule() {
			// Add your scheduled tasks here
		},

		async onQueue(batch) {
			jobsManager.register(new FetchGravatarProfileJob());
			for (let message of batch.messages) await jobsManager.handle(message);
		},
	},
);

declare module "@edgefirst-dev/core" {
	export interface Bindings {
		DB: D1Database;
		QUEUE: Queue;
		// 👇 Env variables
		GRAVATAR_API_TOKEN: string;
		SESSION_SECRET: string;
		APP_ENV: "development" | "production";
	}

	type Schema = typeof schema;
	export interface DatabaseSchema extends Schema {}
}
