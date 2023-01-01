import { z, object, TypeOf } from "zod";

export const createUserSchema = object({
	body: object({
		name: z.string({
			required_error: "Name is required",
		}),
		email: z.string({
			required_error: "email is required",
		}).email("Not a valid email"),
		password: z
			.string({
				required_error: "Password is required",
			})
			.min(6, "Password is too short - should be 6 chars minimum"),
		passwordConfirmation: z
			.string({
				required_error: "Confirm password is required",
			}),
        isAdmin: z.boolean(),
	}).refine((data) => data.password === data.passwordConfirmation, {
		message: "Password do not match",
		path: ["passwordConfirmation"],
	}),
});

export type CreateUserInput = Omit<
	TypeOf<typeof createUserSchema>,
	"body.passwordConfirmation"
>;
