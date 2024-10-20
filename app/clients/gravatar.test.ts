import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import { GravatarProfile } from "app:entities/gravatar-profile";
import { Email } from "@edgefirst-dev/email";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/native";
import { Gravatar } from "./gravatar";

mock.module("@edgefirst-dev/core", () => {
	return {
		orm: mock(),
		env() {
			return {
				fetch(key: string) {
					return key;
				},
			};
		},
	};
});

describe(Gravatar.name, () => {
	let server = setupServer();
	let email = Email.from("john.doe@company.com");

	beforeAll(() => server.listen());
	afterAll(() => server.close());

	test("#constructor()", () => {
		const client = new Gravatar();
		expect(client).toBeInstanceOf(Gravatar);
	});

	test("#profile()", async () => {
		let client = new Gravatar();

		server.resetHandlers(
			http.get("https://api.gravatar.com/v3/profiles/:hash", () => {
				return HttpResponse.json(mockResponse);
			}),
		);

		expect(client.profile(email)).resolves.toBeInstanceOf(GravatarProfile);
	});

	test("#profile() with error", async () => {
		let client = new Gravatar();

		server.resetHandlers(
			http.get("https://api.gravatar.com/v3/profiles/:hash", () => {
				return new HttpResponse(null, { status: 404 });
			}),
		);

		expect(client.profile(email)).rejects.toThrowError(Gravatar.NotFoundError);
	});

	test("#profile() with rate limit error", async () => {
		let client = new Gravatar();

		server.resetHandlers(
			http.get("https://api.gravatar.com/v3/profiles/:hash", () => {
				return new HttpResponse(null, { status: 429 });
			}),
		);

		expect(client.profile(email)).rejects.toThrowError(Gravatar.RateLimitError);
	});

	test("#profile() with server error", async () => {
		let client = new Gravatar();

		server.resetHandlers(
			http.get("https://api.gravatar.com/v3/profiles/:hash", () => {
				return new HttpResponse(null, { status: 500 });
			}),
		);

		expect(client.profile(email)).rejects.toThrowError(Gravatar.ServerError);
	});

	test("#displayName", async () => {
		let client = new Gravatar();

		server.resetHandlers(
			http.get("https://api.gravatar.com/v3/profiles/:hash", () => {
				return HttpResponse.json(mockResponse);
			}),
		);

		let profile = await client.profile(email);

		expect(profile.displayName).toBe("Sergio Xalambrí");
	});
});

const mockResponse = {
	hash: "14330318de450e39207d3063ca9dc23698bba910562fdb497d50cc52e1bae0ea",
	display_name: "Sergio Xalambrí",
	location: "Perú",
	job_title: "Web Developer",
	company: "Daffy.org",
	pronouns: "He/Him",
};
