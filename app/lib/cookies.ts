import { env } from "@edgefirst-dev/core";
import { createCookie } from "react-router";

export namespace Cookies {
	/**
	 * The `session` cookie is used to store the user's session information.
	 *
	 * @example
	 * let sessionValue = await Cookies.session.parse(cookieHeader);
	 */
	export const session = createCookie("session", {
		path: "/",
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		secrets: [env().fetch("SESSION_SECRET", "s3cr3t")],
	});

	/**
	 * The `lng` cookie is used to store the user's preferred language (locale).
	 *
	 * @example
	 * let language = await Cookies.lng.parse(cookieHeader);
	 */
	export const lng = createCookie("lng", {
		path: "/",
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		secrets: [env().fetch("SESSION_SECRET", "s3cr3t")],
	});

	/**
	 * The `returnTo` cookie is used to store the URL the user should be
	 * redirected to after logging in.
	 *
	 * @example
	 * let returnTo = await Cookies.returnTo.parse(cookieHeader);
	 */
	export const returnTo = createCookie("returnTo", {
		path: "/",
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		secrets: [env().fetch("SESSION_SECRET", "s3cr3t")],
	});
}
