import { Session } from "app:entities/session";
import type { User } from "app:entities/user";
import schema from "db:schema";
import { type IPAddress, type UserAgent, orm } from "@edgefirst-dev/core";
import { eq } from "drizzle-orm";

export class SessionsRepository {
	async findById(id: Session["id"]) {
		return Session.fromMany(
			await orm()
				.select()
				.from(schema.sessions)
				.where(eq(schema.sessions.id, id))
				.limit(1)
				.execute(),
		);
	}

	async create({ user, ip, ua, payload }: SessionsRepository.CreateInput) {
		let [session] = await orm()
			.insert(schema.sessions)
			.values({
				userId: user.id,
				ipAddress: ip?.toString(),
				userAgent: ua?.toString(),
				payload,
				lastActivityAt: new Date(),
			})
			.returning();

		if (session) return Session.from(session);
		throw new Error("Failed to create session");
	}

	async destroy(id: Session["id"]) {
		await orm()
			.delete(schema.sessions)
			.where(eq(schema.sessions.id, id))
			.execute();
	}

	async recordActivity(id: Session["id"]) {
		await orm()
			.update(schema.sessions)
			.set({ lastActivityAt: new Date() })
			.where(eq(schema.sessions.id, id))
			.execute();
	}
}

export namespace SessionsRepository {
	export interface CreateInput {
		user: User;
		ip?: IPAddress | null;
		ua?: UserAgent | null;
		payload: Record<string, unknown>;
	}
}
